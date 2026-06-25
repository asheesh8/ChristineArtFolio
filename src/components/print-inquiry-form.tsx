"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  artworks,
  findArtworkBySku,
  getArtworkSku,
  type Artwork,
} from "@/data/artworks";
import { framingOptions, printMaterials, printSizes } from "@/data/printOptions";

const INQUIRIES_KEY = "christine-print-inquiries";

type FormState = {
  sku: string;
  artwork: string;
  size: string;
  material: string;
  name: string;
  email: string;
  phone: string;
  framing: string;
  message: string;
};

export type PrintInquiry = FormState & {
  id: string;
  status: "New" | "Contacted" | "Quoted" | "Archived";
  createdAt: string;
  artworkImage: string;
};

const initialFormState: FormState = {
  sku: "",
  artwork: "",
  size: "",
  material: "",
  name: "",
  email: "",
  phone: "",
  framing: "",
  message: "",
};

function inquiryNumber() {
  return `INQ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function saveInquiry(inquiry: PrintInquiry) {
  const existing = JSON.parse(
    window.localStorage.getItem(INQUIRIES_KEY) || "[]",
  ) as PrintInquiry[];
  window.localStorage.setItem(
    INQUIRIES_KEY,
    JSON.stringify([inquiry, ...existing].slice(0, 100)),
  );
}

export function PrintInquiryForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormState>(initialFormState);
  const urlSku = searchParams.get("sku") || "";
  const effectiveSku = form.sku || urlSku;

  const filteredArtworks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return artworks;
    return artworks.filter((artwork) => {
      const sku = getArtworkSku(artwork).toLowerCase();
      return `${artwork.title} ${artwork.medium} ${artwork.category} ${sku}`
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [query]);

  const selectedArtwork = useMemo(
    () => findArtworkBySku(effectiveSku),
    [effectiveSku],
  );

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function selectArtwork(artwork: Artwork) {
    const sku = getArtworkSku(artwork);
    setForm((current) => ({
      ...current,
      sku,
      artwork: artwork.title,
    }));
    window.history.replaceState(null, "", `/order-prints?sku=${sku}`);
  }

  function canSubmit() {
    return Boolean(
      effectiveSku &&
        selectedArtwork &&
        form.size &&
        form.material &&
        form.name &&
        form.email &&
        form.framing,
    );
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          Inquiry saved
        </p>
        <h2 className="mt-4 font-serif text-5xl leading-none text-stone-950">
          Thanks — your print inquiry has been saved.
        </h2>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          Christine will follow up with availability and pricing.
        </p>
        <div className="mt-8 rounded-2xl bg-[#e9ede4] p-5 text-sm leading-7 text-stone-700">
          <p>
            <strong>Artwork:</strong> {selectedArtwork?.title || form.artwork}
          </p>
          <p>
            <strong>SKU:</strong> {effectiveSku}
          </p>
          <p>
            <strong>Print:</strong> {form.size} on {form.material}
          </p>
          <p>
            <strong>Framing:</strong> {form.framing}
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary mt-8"
          onClick={() => {
            setSubmitted(false);
            setForm(initialFormState);
            window.history.replaceState(null, "", "/order-prints");
          }}
        >
          Start Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.78fr_1fr]">
      <aside className="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)]">
        <div className="flex items-end justify-between gap-4 p-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Catalog
            </p>
            <h2 className="mt-2 font-serif text-4xl text-stone-950">
              Pick artwork
            </h2>
          </div>
          <p className="text-xs font-semibold text-stone-400">
            {filteredArtworks.length} works
          </p>
        </div>
        <input
          className="field-input mx-2 mt-4 w-[calc(100%-1rem)]"
          placeholder="Search title, medium, or SKU"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="mt-4 grid max-h-[28rem] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:max-h-[calc(100vh-20rem)] lg:grid-cols-1">
          {filteredArtworks.map((artwork) => {
            const sku = getArtworkSku(artwork);
            const isSelected = effectiveSku === sku;
            return (
              <button
                key={artwork.id}
                type="button"
                className={`grid grid-cols-[4.25rem_1fr] gap-3 rounded-2xl border p-2 text-left transition ${
                  isSelected
                    ? "border-stone-950 bg-stone-950 text-white"
                    : "border-stone-200 bg-[#fbf8f1] text-stone-800 hover:border-stone-400"
                }`}
                onClick={() => selectArtwork(artwork)}
              >
                <span className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-100">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="90px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 py-1">
                  <span className="block truncate font-serif text-xl leading-tight">
                    {artwork.title}
                  </span>
                  <span
                    className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] ${
                      isSelected ? "text-stone-300" : "text-sage"
                    }`}
                  >
                    {sku}
                  </span>
                  <span
                    className={`mt-2 block text-xs ${
                      isSelected ? "text-stone-300" : "text-stone-500"
                    }`}
                  >
                    {artwork.medium}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <form
        className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSubmit() || !selectedArtwork) return;
          saveInquiry({
            ...form,
            sku: effectiveSku,
            artwork: selectedArtwork.title,
            id: inquiryNumber(),
            status: "New",
            createdAt: new Date().toISOString(),
            artworkImage: selectedArtwork?.image || "",
          });
          setSubmitted(true);
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Print inquiry
            </p>
            <h2 className="mt-3 font-serif text-5xl leading-none text-stone-950">
              Request details
            </h2>
          </div>
          <div className="rounded-2xl bg-[#fbf8f1] px-4 py-3 text-sm text-stone-600">
            <strong className="text-stone-950">SKU:</strong>{" "}
            {effectiveSku || "Choose from catalog"}
          </div>
        </div>

        {selectedArtwork ? (
          <div className="mt-8 grid gap-5 rounded-3xl border border-stone-200 bg-[#fbf8f1] p-4 sm:grid-cols-[7rem_1fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                Selected piece
              </p>
              <p className="mt-2 font-serif text-4xl text-stone-950">
                {selectedArtwork.title}
              </p>
              <p className="mt-2 text-sm text-stone-500">
                {selectedArtwork.medium} · {selectedArtwork.category}
              </p>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                {selectedArtwork.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-[#fbf8f1] p-6 text-stone-600">
            Choose an artwork from the catalog first. The SKU will stay attached
            to the inquiry.
          </div>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="field-label">
            Print size
            <select
              required
              name="size"
              value={form.size}
              className="field-input"
              onChange={(event) => updateField("size", event.target.value)}
            >
              <option value="">Choose a size</option>
              {printSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <label className="field-label">
            Material
            <select
              required
              name="material"
              value={form.material}
              className="field-input"
              onChange={(event) => updateField("material", event.target.value)}
            >
              <option value="">Choose material</option>
              {printMaterials.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </label>
          <label className="field-label">
            Customer name
            <input
              required
              name="name"
              value={form.name}
              className="field-input"
              onChange={(event) => updateField("name", event.target.value)}
            />
          </label>
          <label className="field-label">
            Email
            <input
              required
              type="email"
              name="email"
              value={form.email}
              className="field-input"
              onChange={(event) => updateField("email", event.target.value)}
            />
          </label>
          <label className="field-label">
            Phone optional
            <input
              name="phone"
              value={form.phone}
              className="field-input"
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </label>
          <label className="field-label">
            Framing interest
            <select
              required
              name="framing"
              value={form.framing}
              className="field-input"
              onChange={(event) => updateField("framing", event.target.value)}
            >
              <option value="">Choose one</option>
              {framingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="field-label mt-5">
          Message
          <textarea
            name="message"
            rows={5}
            value={form.message}
            className="field-input resize-none"
            placeholder="Tell Christine about room, deadline, gift timing, or framing ideas."
            onChange={(event) => updateField("message", event.target.value)}
          />
        </label>

        {!canSubmit() ? (
          <p className="mt-5 rounded-2xl bg-[#f3eee4] p-4 text-sm font-semibold text-stone-700">
            Pick an artwork and complete the required contact and print fields.
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-6">
          <p className="text-sm text-stone-500">
            Christine confirms final price and availability.
          </p>
          <button type="submit" className="btn-primary" disabled={!canSubmit()}>
            Submit Inquiry
          </button>
        </div>
      </form>
    </div>
  );
}

export { INQUIRIES_KEY };
