import hashlib
import json
import os
import re
import time
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://christineporterphotography.zenfolio.com"
OUT_DIR = "public/christine-assets"
MANIFEST_PATH = os.path.join(OUT_DIR, "manifest.json")

HEADERS = {
    "User-Agent": "Mozilla/5.0 artfolio-client-redesign-asset-collector"
}

os.makedirs(OUT_DIR, exist_ok=True)

visited_pages = set()
seen_images = set()
manifest = []


def save_manifest():
    with open(MANIFEST_PATH, "w", encoding="utf-8") as file:
        json.dump(manifest, file, indent=2)


def safe_filename(url, alt=""):
    parsed = urlparse(url)
    ext = os.path.splitext(parsed.path)[1].split("?")[0].lower()
    if ext not in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
        ext = ".jpg"

    base = re.sub(r"[^a-zA-Z0-9]+", "-", alt.lower()).strip("-")[:44]
    digest = hashlib.md5(url.encode("utf-8")).hexdigest()[:10]

    if base:
        return f"christine-{base}-{digest}{ext}"
    return f"christine-artwork-{digest}{ext}"


def guessed_title(filename, alt=""):
    if alt:
        return alt.strip().strip('"')
    title = os.path.splitext(filename)[0]
    title = re.sub(r"^christine-", "", title)
    title = re.sub(r"-[a-f0-9]{10}$", "", title)
    return title.replace("-", " ").title()


def get_html(url):
    try:
        response = requests.get(url, headers=HEADERS, timeout=20)
        response.raise_for_status()
        return response.text
    except Exception as error:
        print("Failed page:", url, error)
        return None


def normalized_image_url(page_url, raw_url):
    if not raw_url or raw_url.startswith("data:"):
        return None
    img_url = urljoin(page_url, raw_url)
    parsed = urlparse(img_url)
    if parsed.netloc and "christineporterphotography.zenfolio.com" not in parsed.netloc:
        return None
    return img_url


def download_image(img_url, source_page, alt=""):
    if img_url in seen_images:
        return

    seen_images.add(img_url)
    filename = safe_filename(img_url, alt)
    path = os.path.join(OUT_DIR, filename)

    try:
        response = requests.get(img_url, headers=HEADERS, timeout=30)
        content_type = response.headers.get("content-type", "")

        if response.status_code == 200 and "image" in content_type:
            with open(path, "wb") as file:
                file.write(response.content)

            manifest.append(
                {
                    "source_page": source_page,
                    "image_url": img_url,
                    "filename": filename,
                    "alt": alt,
                    "guessed_title": guessed_title(filename, alt),
                    "bytes": len(response.content),
                }
            )

            save_manifest()
            print("Downloaded:", filename, flush=True)
            time.sleep(0.25)
        else:
            print(
                "Skipped non-image:",
                img_url,
                response.status_code,
                content_type,
                flush=True,
            )
    except Exception as error:
        print("Failed image:", img_url, error, flush=True)


def image_candidates(img):
    candidates = [
        img.get("src"),
        img.get("data-src"),
        img.get("data-original"),
        img.get("data-lazy"),
        img.get("data-hires"),
    ]
    srcset = img.get("srcset") or img.get("data-srcset")
    if srcset:
        parts = [part.strip().split(" ")[0] for part in srcset.split(",")]
        candidates.extend(reversed(parts))
    return [candidate for candidate in candidates if candidate]


def extract_inline_image_urls(html):
    patterns = [
        r"https?://christineporterphotography\.zenfolio\.com/img/[^'\"\\\s)]+",
        r"/img/[^'\"\\\s)]+?\.(?:jpg|jpeg|png|webp|gif)(?:\?[^'\"\\\s)]*)?",
    ]
    urls = []
    for pattern in patterns:
        urls.extend(re.findall(pattern, html, flags=re.IGNORECASE))
    return urls


def extract_images_and_links(page_url):
    if page_url in visited_pages:
        return []

    visited_pages.add(page_url)
    print("Scanning:", page_url, flush=True)

    html = get_html(page_url)
    if not html:
        return []

    soup = BeautifulSoup(html, "html.parser")

    for img in soup.find_all("img"):
        alt = img.get("alt", "").strip()
        for candidate in image_candidates(img):
            img_url = normalized_image_url(page_url, candidate)
            if img_url:
                download_image(img_url, page_url, alt)
                break

    for raw_url in extract_inline_image_urls(html):
        img_url = normalized_image_url(page_url, raw_url)
        if img_url:
            download_image(img_url, page_url, "")

    links = []
    for anchor in soup.find_all("a", href=True):
        href = urljoin(page_url, anchor["href"])
        if not href.startswith(BASE):
            continue
        if any(skip in href for skip in ["cdn-cgi", ".rss", ".atom", "user-agreement"]):
            continue
        if href not in visited_pages:
            links.append(href)

    return links


def main():
    to_visit = [BASE]
    max_pages = int(os.environ.get("ZENFOLIO_MAX_PAGES", "75"))

    try:
        while to_visit and len(visited_pages) < max_pages:
            current = to_visit.pop(0)
            found_links = extract_images_and_links(current)

            for link in found_links:
                if link not in visited_pages and link not in to_visit:
                    to_visit.append(link)

            time.sleep(0.2)
    except KeyboardInterrupt:
        print("Interrupted. Saving current manifest.", flush=True)
    finally:
        save_manifest()

    print(f"Done. Downloaded {len(manifest)} images.")
    print(f"Manifest saved to {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
