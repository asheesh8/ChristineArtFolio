"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { artworks, getArtworkSku } from "@/data/artworks";
import { businessInfo } from "@/data/businessInfo";
import { categories } from "@/data/categories";
import { printMaterials, printSizes } from "@/data/printOptions";
import { INQUIRIES_KEY, type PrintInquiry } from "@/components/print-inquiry-form";

const ADMIN_TOOLS_KEY = "christine-admin-tools";

const seedInquiries: PrintInquiry[] = [
  {
    id: "INQ-DEMO1",
    status: "New",
    createdAt: new Date().toISOString(),
    sku: getArtworkSku(artworks[1]),
    artwork: artworks[1].title,
    artworkImage: artworks[1].image,
    size: "16 x 20",
    material: "Fine Art Paper",
    name: "Maya",
    email: "maya@example.com",
    phone: "",
    framing: "Maybe",
    message: "I am interested in this for a living room wall.",
  },
  {
    id: "INQ-DEMO2",
    status: "Contacted",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    sku: getArtworkSku(artworks[3]),
    artwork: artworks[3].title,
    artworkImage: artworks[3].image,
    size: "Custom size",
    material: "Canvas",
    name: "Evan",
    email: "evan@example.com",
    phone: "802-555-0134",
    framing: "Yes",
    message: "Could Christine let me know if the original is also available?",
  },
];

function readInquiries() {
  if (typeof window === "undefined") return seedInquiries;
  const stored = window.localStorage.getItem(INQUIRIES_KEY);
  if (!stored) return seedInquiries;
  const parsed = JSON.parse(stored) as PrintInquiry[];
  return parsed.length ? parsed : seedInquiries;
}

function generateNewSku() {
  return `CP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

type AdminToolsState = {
  inventory: Array<{
    sku: string;
    title: string;
    medium: string;
    status: string;
    priceNote: string;
  }>;
  featuredSkus: string[];
  availability: Record<string, string>;
  pricingNotes: Record<string, string>;
  categories: Array<{ name: string; description: string }>;
  printSizes: string[];
  printMaterials: string[];
  siteSettings: {
    announcement: string;
    email: string;
    pickupNote: string;
    showDemoReviews: boolean;
  };
};

function defaultAdminTools(): AdminToolsState {
  const featuredSkus = artworks.slice(0, 4).map((artwork) => getArtworkSku(artwork));
  return {
    inventory: [],
    featuredSkus,
    availability: Object.fromEntries(
      artworks.slice(0, 12).map((artwork) => [getArtworkSku(artwork), artwork.originalStatus]),
    ),
    pricingNotes: Object.fromEntries(
      artworks
        .slice(0, 8)
        .map((artwork) => [getArtworkSku(artwork), artwork.price || "Confirm with Christine"]),
    ),
    categories: categories.map((category) => ({
      name: category.name,
      description: category.description,
    })),
    printSizes,
    printMaterials,
    siteSettings: {
      announcement: "Print inquiries are open. Christine confirms price and availability.",
      email: businessInfo.email,
      pickupNote: "Local pickup and shipping can be discussed after inquiry.",
      showDemoReviews: true,
    },
  };
}

function readAdminTools() {
  if (typeof window === "undefined") return defaultAdminTools();
  const stored = window.localStorage.getItem(ADMIN_TOOLS_KEY);
  if (!stored) return defaultAdminTools();
  return { ...defaultAdminTools(), ...(JSON.parse(stored) as Partial<AdminToolsState>) };
}

function saveAdminTools(next: AdminToolsState) {
  window.localStorage.setItem(ADMIN_TOOLS_KEY, JSON.stringify(next));
}

function defaultMessage(inquiry: PrintInquiry) {
  return `Hi ${inquiry.name},

Thank you for asking about "${inquiry.artwork}" (${inquiry.sku}). I would be happy to help with a ${inquiry.size} ${inquiry.material.toLowerCase()} print.

I can confirm availability, timing, framing options, and the final price for you.

Warmly,
Christine`;
}

export function AdminDashboard() {
  const [inquiries, setInquiries] = useState<PrintInquiry[]>(readInquiries);
  const [selectedId, setSelectedId] = useState(inquiries[0]?.id || "");
  const [inventorySku, setInventorySku] = useState(generateNewSku());
  const [tools, setTools] = useState<AdminToolsState>(readAdminTools);
  const [newInventory, setNewInventory] = useState({
    title: "",
    medium: "Photography",
    status: "Inquire",
    priceNote: "Confirm with Christine",
  });
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newPrintSize, setNewPrintSize] = useState("");
  const [newPrintMaterial, setNewPrintMaterial] = useState("");

  const selectedInquiry = useMemo(
    () => inquiries.find((inquiry) => inquiry.id === selectedId) || inquiries[0],
    [inquiries, selectedId],
  );

  const [message, setMessage] = useState(
    selectedInquiry ? defaultMessage(selectedInquiry) : "",
  );

  function selectInquiry(inquiry: PrintInquiry) {
    setSelectedId(inquiry.id);
    setMessage(defaultMessage(inquiry));
  }

  function updateStatus(id: string, status: PrintInquiry["status"]) {
    const next = inquiries.map((inquiry) =>
      inquiry.id === id ? { ...inquiry, status } : inquiry,
    );
    setInquiries(next);
    window.localStorage.setItem(INQUIRIES_KEY, JSON.stringify(next));
  }

  async function copyMessage() {
    await navigator.clipboard.writeText(message);
  }

  function mailtoLink() {
    if (!selectedInquiry) return "#";
    const subject = `Christine Porter Fine Art — ${selectedInquiry.artwork}`;
    return `mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
  }

  function downloadClientCard() {
    if (!selectedInquiry) return;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = 1200;
    canvas.height = 900;
    context.fillStyle = "#fbf8f1";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#1c1917";
    context.font = "64px serif";
    context.fillText(`Hey ${selectedInquiry.name},`, 80, 110);
    context.font = "34px serif";
    context.fillText("Christine Porter Fine Art", 80, 170);
    context.font = "22px sans-serif";
    context.fillText(selectedInquiry.artwork, 80, 820);
    context.fillText(`${selectedInquiry.sku} · ${selectedInquiry.size}`, 80, 855);
    context.font = "28px serif";
    context.fillText("- Christine", 915, 820);

    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      context.drawImage(image, 80, 220, 1040, 540);
      const link = document.createElement("a");
      link.download = `${selectedInquiry.sku}-${selectedInquiry.name}-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    image.src = selectedInquiry.artworkImage;
  }

  function updateTools(next: AdminToolsState) {
    setTools(next);
    saveAdminTools(next);
  }

  function addInventoryItem() {
    if (!newInventory.title.trim()) return;
    const item = {
      sku: inventorySku,
      title: newInventory.title.trim(),
      medium: newInventory.medium,
      status: newInventory.status,
      priceNote: newInventory.priceNote,
    };
    updateTools({ ...tools, inventory: [item, ...tools.inventory] });
    setInventorySku(generateNewSku());
    setNewInventory({
      title: "",
      medium: "Photography",
      status: "Inquire",
      priceNote: "Confirm with Christine",
    });
  }

  function toggleFeatured(sku: string) {
    const featuredSkus = tools.featuredSkus.includes(sku)
      ? tools.featuredSkus.filter((item) => item !== sku)
      : [...tools.featuredSkus, sku].slice(-8);
    updateTools({ ...tools, featuredSkus });
  }

  function setAvailability(sku: string, status: string) {
    updateTools({
      ...tools,
      availability: { ...tools.availability, [sku]: status },
    });
  }

  function setPricingNote(sku: string, note: string) {
    updateTools({
      ...tools,
      pricingNotes: { ...tools.pricingNotes, [sku]: note },
    });
  }

  function addCategory() {
    if (!newCategory.name.trim()) return;
    updateTools({
      ...tools,
      categories: [
        ...tools.categories,
        {
          name: newCategory.name.trim(),
          description: newCategory.description.trim() || "New category description.",
        },
      ],
    });
    setNewCategory({ name: "", description: "" });
  }

  function removeCategory(name: string) {
    updateTools({
      ...tools,
      categories: tools.categories.filter((category) => category.name !== name),
    });
  }

  function addPrintSize() {
    if (!newPrintSize.trim()) return;
    updateTools({ ...tools, printSizes: [...tools.printSizes, newPrintSize.trim()] });
    setNewPrintSize("");
  }

  function addPrintMaterial() {
    if (!newPrintMaterial.trim()) return;
    updateTools({
      ...tools,
      printMaterials: [...tools.printMaterials, newPrintMaterial.trim()],
    });
    setNewPrintMaterial("");
  }

  function removePrintSize(size: string) {
    updateTools({ ...tools, printSizes: tools.printSizes.filter((item) => item !== size) });
  }

  function removePrintMaterial(material: string) {
    updateTools({
      ...tools,
      printMaterials: tools.printMaterials.filter((item) => item !== material),
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["New inquiries", inquiries.filter((item) => item.status === "New").length],
          ["Total inquiries", inquiries.length],
          ["Catalog works", artworks.length],
          ["Originals", artworks.filter((item) => item.availableOriginal).length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-stone-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              {label}
            </p>
            <p className="mt-3 font-serif text-5xl text-stone-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
                Inbox
              </p>
              <h2 className="mt-2 font-serif text-4xl">Client inquiries</h2>
            </div>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => setInquiries(readInquiries())}
            >
              Refresh
            </button>
          </div>
          <div className="mt-5 grid max-h-[42rem] gap-3 overflow-y-auto pr-1">
            {inquiries.map((inquiry) => (
              <button
                key={inquiry.id}
                type="button"
                className={`grid grid-cols-[4.5rem_1fr] gap-3 rounded-2xl border p-3 text-left transition ${
                  selectedInquiry?.id === inquiry.id
                    ? "border-stone-950 bg-stone-950 text-white"
                    : "border-stone-200 bg-[#fbf8f1] text-stone-800 hover:border-stone-400"
                }`}
                onClick={() => selectInquiry(inquiry)}
              >
                <span className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-100">
                  <Image
                    src={inquiry.artworkImage}
                    alt={inquiry.artwork}
                    fill
                    sizes="90px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{inquiry.name}</span>
                    <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.14em]">
                      {inquiry.status}
                    </span>
                  </span>
                  <span className="mt-1 block truncate font-serif text-2xl">
                    {inquiry.artwork}
                  </span>
                  <span className="mt-1 block text-xs opacity-70">
                    {inquiry.sku} · {inquiry.size} · {inquiry.material}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm">
          {selectedInquiry ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
                    Reach out
                  </p>
                  <h2 className="mt-2 font-serif text-4xl">
                    Message {selectedInquiry.name}
                  </h2>
                  <p className="mt-2 text-sm text-stone-500">
                    {selectedInquiry.email} · {selectedInquiry.sku}
                  </p>
                </div>
                <select
                  className="field-input w-auto min-w-40"
                  value={selectedInquiry.status}
                  onChange={(event) =>
                    updateStatus(
                      selectedInquiry.id,
                      event.target.value as PrintInquiry["status"],
                    )
                  }
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Quoted</option>
                  <option>Archived</option>
                </select>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[0.78fr_1fr]">
                <div className="rounded-3xl bg-[#fbf8f1] p-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="font-serif text-4xl">Hey {selectedInquiry.name},</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.2em] text-sage">
                      Christine Porter Fine Art
                    </p>
                    <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
                      <Image
                        src={selectedInquiry.artworkImage}
                        alt={selectedInquiry.artwork}
                        fill
                        sizes="420px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-4 font-serif text-2xl">
                      {selectedInquiry.artwork}
                    </p>
                    <p className="text-xs text-stone-500">
                      {selectedInquiry.sku} · {selectedInquiry.size}
                    </p>
                    <p className="mt-4 text-right font-serif text-2xl">
                      - Christine
                    </p>
                  </div>
                  <button
                    className="btn-secondary mt-4 w-full"
                    type="button"
                    onClick={downloadClientCard}
                  >
                    Download Image Card
                  </button>
                </div>

                <div>
                  <label className="field-label">
                    Custom message
                    <textarea
                      className="field-input min-h-72 resize-none"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    />
                  </label>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a className="btn-primary" href={mailtoLink()}>
                      Email Client
                    </a>
                    <button className="btn-secondary" type="button" onClick={copyMessage}>
                      Copy Message
                    </button>
                  </div>
                  <div className="mt-5 rounded-2xl bg-[#fbf8f1] p-4 text-sm leading-7 text-stone-600">
                    <p>
                      <strong>Requested:</strong> {selectedInquiry.size},{" "}
                      {selectedInquiry.material}, framing {selectedInquiry.framing}
                    </p>
                    <p>
                      <strong>Client note:</strong>{" "}
                      {selectedInquiry.message || "No extra note."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>No inquiry selected.</p>
          )}
        </section>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
            Inventory tool
          </p>
          <h2 className="mt-2 font-serif text-4xl">Add a piece</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            Mock uploader for Christine. When a new artwork is added later, the
            admin flow can generate a SKU automatically.
          </p>
          <div className="mt-6 rounded-2xl bg-[#fbf8f1] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Generated SKU
            </p>
            <p className="mt-2 font-serif text-4xl">{inventorySku}</p>
            <button
              className="btn-secondary mt-4"
              type="button"
              onClick={() => setInventorySku(generateNewSku())}
            >
              Generate New SKU
            </button>
          </div>
          <div className="mt-5 grid gap-4">
            <label className="field-label">
              Artwork title
              <input
                className="field-input"
                value={newInventory.title}
                onChange={(event) =>
                  setNewInventory({ ...newInventory, title: event.target.value })
                }
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field-label">
                Medium
                <select
                  className="field-input"
                  value={newInventory.medium}
                  onChange={(event) =>
                    setNewInventory({ ...newInventory, medium: event.target.value })
                  }
                >
                  <option>Photography</option>
                  <option>Oil on canvas</option>
                  <option>Watercolor</option>
                  <option>Pastel</option>
                  <option>Colored pencil</option>
                </select>
              </label>
              <label className="field-label">
                Status
                <select
                  className="field-input"
                  value={newInventory.status}
                  onChange={(event) =>
                    setNewInventory({ ...newInventory, status: event.target.value })
                  }
                >
                  <option>Available</option>
                  <option>Inquire</option>
                  <option>Prints Only</option>
                  <option>Sold</option>
                </select>
              </label>
            </div>
            <label className="field-label">
              Pricing note
              <input
                className="field-input"
                value={newInventory.priceNote}
                onChange={(event) =>
                  setNewInventory({ ...newInventory, priceNote: event.target.value })
                }
              />
            </label>
            <button className="btn-primary" type="button" onClick={addInventoryItem}>
              Add Mock Inventory
            </button>
          </div>
          <div className="mt-5 space-y-2">
            {tools.inventory.map((item) => (
              <div key={item.sku} className="rounded-2xl bg-[#fbf8f1] p-4 text-sm">
                <p className="font-semibold text-stone-950">{item.title}</p>
                <p className="mt-1 text-stone-500">
                  {item.sku} · {item.medium} · {item.status}
                </p>
                <p className="mt-1 text-stone-600">{item.priceNote}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-stone-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Featured works
            </p>
            <h2 className="mt-2 font-serif text-4xl">Homepage picks</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {artworks.slice(0, 10).map((artwork) => {
                const sku = getArtworkSku(artwork);
                return (
                  <button
                    key={artwork.id}
                    type="button"
                    className={`rounded-2xl border p-4 text-left ${
                      tools.featuredSkus.includes(sku)
                        ? "border-stone-950 bg-stone-950 text-white"
                        : "border-stone-200 bg-[#fbf8f1] text-stone-800"
                    }`}
                    onClick={() => toggleFeatured(sku)}
                  >
                    <p className="font-semibold">{artwork.title}</p>
                    <p className="mt-1 text-xs opacity-70">{sku}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Availability
            </p>
            <h2 className="mt-2 font-serif text-4xl">Original status</h2>
            <div className="mt-5 grid gap-3">
              {artworks.slice(0, 8).map((artwork) => {
                const sku = getArtworkSku(artwork);
                return (
                  <div
                    key={artwork.id}
                    className="grid gap-3 rounded-2xl bg-[#fbf8f1] p-4 md:grid-cols-[1fr_12rem]"
                  >
                    <div>
                      <p className="font-semibold">{artwork.title}</p>
                      <p className="text-xs text-stone-500">{sku}</p>
                    </div>
                    <select
                      className="field-input mt-0"
                      value={tools.availability[sku] || artwork.originalStatus}
                      onChange={(event) => setAvailability(sku, event.target.value)}
                    >
                      <option>Available</option>
                      <option>Inquire</option>
                      <option>Prints Only</option>
                      <option>Sold</option>
                    </select>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Pricing notes
            </p>
            <h2 className="mt-2 font-serif text-4xl">Quote helper</h2>
            <div className="mt-5 grid gap-3">
              {artworks.slice(0, 6).map((artwork) => {
                const sku = getArtworkSku(artwork);
                return (
                  <label key={artwork.id} className="field-label">
                    {artwork.title} · {sku}
                    <input
                      className="field-input"
                      value={tools.pricingNotes[sku] || ""}
                      onChange={(event) => setPricingNote(sku, event.target.value)}
                    />
                  </label>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Categories
            </p>
            <h2 className="mt-2 font-serif text-4xl">Browse groups</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {tools.categories.map((category) => (
                <div key={category.name} className="rounded-2xl bg-[#fbf8f1] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {category.description}
                      </p>
                    </div>
                    <button
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400"
                      type="button"
                      onClick={() => removeCategory(category.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-[0.6fr_1fr_auto]">
              <input
                className="field-input"
                placeholder="Category name"
                value={newCategory.name}
                onChange={(event) =>
                  setNewCategory({ ...newCategory, name: event.target.value })
                }
              />
              <input
                className="field-input"
                placeholder="Description"
                value={newCategory.description}
                onChange={(event) =>
                  setNewCategory({ ...newCategory, description: event.target.value })
                }
              />
              <button className="btn-secondary" type="button" onClick={addCategory}>
                Add
              </button>
            </div>
          </section>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Print sizes
            </p>
            <h2 className="mt-2 font-serif text-4xl">Order options</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <p className="font-semibold">Sizes</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tools.printSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="rounded-full bg-[#fbf8f1] px-4 py-2 text-sm"
                      onClick={() => removePrintSize(size)}
                    >
                      {size} ×
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    className="field-input"
                    placeholder="New size"
                    value={newPrintSize}
                    onChange={(event) => setNewPrintSize(event.target.value)}
                  />
                  <button className="btn-secondary" type="button" onClick={addPrintSize}>
                    Add
                  </button>
                </div>
              </div>
              <div>
                <p className="font-semibold">Materials</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tools.printMaterials.map((material) => (
                    <button
                      key={material}
                      type="button"
                      className="rounded-full bg-[#fbf8f1] px-4 py-2 text-sm"
                      onClick={() => removePrintMaterial(material)}
                    >
                      {material} ×
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    className="field-input"
                    placeholder="New material"
                    value={newPrintMaterial}
                    onChange={(event) => setNewPrintMaterial(event.target.value)}
                  />
                  <button
                    className="btn-secondary"
                    type="button"
                    onClick={addPrintMaterial}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Site settings
            </p>
            <h2 className="mt-2 font-serif text-4xl">Preview controls</h2>
            <div className="mt-5 grid gap-4">
              <label className="field-label">
                Announcement
                <textarea
                  className="field-input min-h-28 resize-none"
                  value={tools.siteSettings.announcement}
                  onChange={(event) =>
                    updateTools({
                      ...tools,
                      siteSettings: {
                        ...tools.siteSettings,
                        announcement: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <label className="field-label">
                Contact email
                <input
                  className="field-input"
                  value={tools.siteSettings.email}
                  onChange={(event) =>
                    updateTools({
                      ...tools,
                      siteSettings: { ...tools.siteSettings, email: event.target.value },
                    })
                  }
                />
              </label>
              <label className="field-label">
                Pickup / shipping note
                <input
                  className="field-input"
                  value={tools.siteSettings.pickupNote}
                  onChange={(event) =>
                    updateTools({
                      ...tools,
                      siteSettings: {
                        ...tools.siteSettings,
                        pickupNote: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <label className="flex items-center gap-3 text-sm font-semibold text-stone-700">
                <input
                  type="checkbox"
                  checked={tools.siteSettings.showDemoReviews}
                  onChange={(event) =>
                    updateTools({
                      ...tools,
                      siteSettings: {
                        ...tools.siteSettings,
                        showDemoReviews: event.target.checked,
                      },
                    })
                  }
                />
                Show demo reviews until real Google reviews are ready
              </label>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
