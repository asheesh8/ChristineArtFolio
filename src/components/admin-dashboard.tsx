"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { artworks, getArtworkSku } from "@/data/artworks";
import { INQUIRIES_KEY, type PrintInquiry } from "@/components/print-inquiry-form";

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
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            "Featured works",
            "Availability",
            "Pricing notes",
            "Categories",
            "Print sizes",
            "Site settings",
          ].map((tool) => (
            <div key={tool} className="rounded-3xl border border-stone-200 bg-white p-5">
              <p className="font-serif text-3xl">{tool}</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Ready for Supabase-backed editing, filters, and publish controls.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
