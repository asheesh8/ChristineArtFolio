import manifest from "../../public/christine-assets/manifest.json";

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  sku?: string;
  category: string;
  medium: string;
  description: string;
  image: string;
  availableOriginal: boolean;
  originalStatus: "Available" | "Prints Only" | "Inquire" | "Sold";
  price: string;
  dimensions: string;
  featured: boolean;
  sourceUrl: string;
};

type ManifestItem = {
  source_page: string;
  image_url: string;
  filename: string;
  alt: string;
  guessed_title: string;
  bytes: number;
};

export function createArtworkSku(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return `CP-${hash.toString(36).toUpperCase().padStart(6, "0").slice(0, 6)}`;
}

export function getArtworkSku(artwork: Pick<Artwork, "id" | "slug" | "sku">) {
  return artwork.sku || createArtworkSku(artwork.slug || artwork.id);
}

const curatedArtworks: Artwork[] = [
  {
    id: "pastel-study",
    title: "Pastel Study",
    slug: "pastel-study",
    category: "Pastel",
    medium: "Pastel",
    description:
      "A soft, handmade work with gentle texture and a quiet sense of presence.",
    image: "/christine-assets/christine-pastel-789b0c68c2.jpg",
    availableOriginal: true,
    originalStatus: "Inquire",
    price: "Inquire",
    dimensions: "Dimensions to confirm",
    featured: true,
    sourceUrl: "https://christineporterphotography.zenfolio.com",
  },
  {
    id: "lake-champlain-mountain-view",
    title: "Lake Champlain Mountain View",
    slug: "lake-champlain-mountain-view",
    category: "Landscapes",
    medium: "Photography",
    description:
      "A calm lake and mountain view with the quiet sweep of Vermont light.",
    image:
      "/christine-assets/christine-lake-champlain-mountain-view-7d824e67b2.jpg",
    availableOriginal: false,
    originalStatus: "Prints Only",
    price: "Print inquiry",
    dimensions: "Multiple print sizes",
    featured: true,
    sourceUrl: "https://christineporterphotography.zenfolio.com",
  },
  {
    id: "alpacas-in-doorway",
    title: "Alpacas in Doorway",
    slug: "alpacas-in-doorway",
    category: "Wildlife",
    medium: "Photography",
    description:
      "A character-rich animal portrait with a classic Vermont farm feeling.",
    image: "/christine-assets/christine-alpacas-in-doorway-45b90545fa.jpg",
    availableOriginal: false,
    originalStatus: "Prints Only",
    price: "Print inquiry",
    dimensions: "Multiple print sizes",
    featured: true,
    sourceUrl: "https://christineporterphotography.zenfolio.com",
  },
  {
    id: "rooster-reborn",
    title: "Rooster Reborn",
    slug: "rooster-reborn",
    category: "Oil on Canvas",
    medium: "Oil on canvas",
    description:
      "An expressive original painting with bold movement and studio texture.",
    image: "/christine-assets/christine-rooster-reborn-oil-on-canvas-b099cff6e2.jpg",
    availableOriginal: true,
    originalStatus: "Inquire",
    price: "Inquire",
    dimensions: "Dimensions to confirm",
    featured: true,
    sourceUrl: "https://christineporterphotography.zenfolio.com",
  },
  {
    id: "watercolor-study",
    title: "Watercolor Study",
    slug: "watercolor-study",
    category: "Watercolor",
    medium: "Watercolor",
    description:
      "A gentle watercolor piece selected from Christine's public gallery.",
    image: "/christine-assets/christine-watercolor-49bb2fcce4.jpg",
    availableOriginal: true,
    originalStatus: "Inquire",
    price: "Inquire",
    dimensions: "Dimensions to confirm",
    featured: false,
    sourceUrl: "https://christineporterphotography.zenfolio.com",
  },
  {
    id: "quiet-gallery-piece",
    title: "Quiet Gallery Piece",
    slug: "quiet-gallery-piece",
    category: "Fine Art",
    medium: "Fine art",
    description:
      "An untitled fine art piece available for collector inquiry and print conversation.",
    image: "/christine-assets/christine-artwork-d7b0f82810.jpg",
    availableOriginal: true,
    originalStatus: "Inquire",
    price: "Inquire",
    dimensions: "Dimensions to confirm",
    featured: false,
    sourceUrl: "https://christineporterphotography.zenfolio.com",
  },
  {
    id: "vermont-postcard",
    title: "Vermont Postcard",
    slug: "vermont-postcard",
    category: "Vermont Scenes",
    medium: "Photography",
    description:
      "A print-friendly scene prepared for the new ordering experience.",
    image: "/christine-assets/christine-artwork-45b7b54129.jpg",
    availableOriginal: false,
    originalStatus: "Prints Only",
    price: "Print inquiry",
    dimensions: "Multiple print sizes",
    featured: false,
    sourceUrl: "https://christineporterphotography.zenfolio.com",
  },
];

const curatedImages = new Set(curatedArtworks.map((artwork) => artwork.image));

function titleFromManifest(item: ManifestItem, index: number) {
  const title = (item.guessed_title || item.alt || "").trim().replace(/"+/g, "");
  if (title && title.toLowerCase() !== "artwork") {
    return title;
  }
  return `Catalog Piece ${String(index + 1).padStart(3, "0")}`;
}

function slugify(value: string, index: number) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "catalog-piece"}-${index + 1}`;
}

function inferMedium(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("oil")) return "Oil on canvas";
  if (lower.includes("watercolor")) return "Watercolor";
  if (lower.includes("pastel")) return "Pastel";
  if (lower.includes("pencil")) return "Colored pencil";
  if (lower.includes("cyanotype")) return "Cyanotype";
  return "Photography";
}

function inferCategory(title: string, medium: string) {
  const lower = title.toLowerCase();
  if (medium !== "Photography") return medium;
  if (
    lower.includes("mount") ||
    lower.includes("sunset") ||
    lower.includes("sunrise") ||
    lower.includes("forest") ||
    lower.includes("lake")
  ) {
    return "Landscapes";
  }
  if (lower.includes("girls") || lower.includes("alpaca")) return "Wildlife";
  return "Vermont Scenes";
}

const scrapedArtworks: Artwork[] = (manifest as ManifestItem[])
  .filter((item) => !curatedImages.has(`/christine-assets/${item.filename}`))
  .map((item, index) => {
    const title = titleFromManifest(item, index);
    const medium = inferMedium(title);
    const category = inferCategory(title, medium);
    const isOriginal = medium !== "Photography" && medium !== "Cyanotype";

    return {
      id: `scraped-${slugify(title, index)}`,
      title,
      slug: slugify(title, index),
      sku: createArtworkSku(`${item.filename}-${index}`),
      category,
      medium,
      description:
        item.alt || item.guessed_title
          ? `A cataloged work from Christine's current art and photography collection.`
          : `An untitled work available for collector review and inquiry.`,
      image: `/christine-assets/${item.filename}`,
      availableOriginal: isOriginal,
      originalStatus: isOriginal ? "Inquire" : "Prints Only",
      price: isOriginal ? "Inquire" : "Print inquiry",
      dimensions: isOriginal ? "Dimensions to confirm" : "Multiple print sizes",
      featured: false,
      sourceUrl: item.source_page || item.image_url,
    };
  });

export const artworks: Artwork[] = [...curatedArtworks, ...scrapedArtworks];
export const featuredArtworks = artworks.filter((artwork) => artwork.featured);
export const availableOriginals = artworks.filter(
  (artwork) => artwork.availableOriginal,
);
export const findArtworkBySku = (sku: string) =>
  artworks.find((artwork) => getArtworkSku(artwork) === sku);
