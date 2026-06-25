"use client";

import { useState } from "react";
import { artworks } from "@/data/artworks";
import { framingOptions, printMaterials, printSizes } from "@/data/printOptions";

export function PrintInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field-label">
          Customer name
          <input required name="name" className="field-input" />
        </label>
        <label className="field-label">
          Email
          <input required type="email" name="email" className="field-input" />
        </label>
        <label className="field-label">
          Phone optional
          <input name="phone" className="field-input" />
        </label>
        <label className="field-label">
          Selected artwork
          <select required name="artwork" className="field-input">
            <option value="">Choose a piece</option>
            {artworks.map((artwork) => (
              <option key={artwork.id} value={artwork.title}>
                {artwork.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field-label">
          Print size
          <select required name="size" className="field-input">
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
          <select required name="material" className="field-input">
            <option value="">Choose material</option>
            {printMaterials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </label>
        <label className="field-label">
          Framing interest
          <select required name="framing" className="field-input">
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
          className="field-input resize-none"
          placeholder="Tell Christine about the piece, room, deadline, or framing ideas."
        />
      </label>
      <button type="submit" className="btn-primary mt-6">
        Submit Inquiry
      </button>
      {submitted ? (
        <p className="mt-5 rounded-2xl bg-[#e9ede4] p-4 text-sm font-semibold text-stone-800">
          Thanks — your print inquiry has been saved. Christine will follow up
          with availability and pricing.
        </p>
      ) : null}
    </form>
  );
}
