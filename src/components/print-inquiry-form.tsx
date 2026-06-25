"use client";

import { useMemo, useState } from "react";
import { artworks } from "@/data/artworks";
import { framingOptions, printMaterials, printSizes } from "@/data/printOptions";

const steps = [
  {
    eyebrow: "Step 1",
    title: "Choose the artwork",
    copy: "Start with the piece you want printed. Christine can confirm final print availability before production.",
  },
  {
    eyebrow: "Step 2",
    title: "Pick size and material",
    copy: "Choose a starting size and surface. Custom sizing can be discussed in the message.",
  },
  {
    eyebrow: "Step 3",
    title: "Contact and framing",
    copy: "Tell Christine how to reach you and whether framing should be part of the conversation.",
  },
  {
    eyebrow: "Step 4",
    title: "Review your inquiry",
    copy: "Add any notes about room, deadline, gift timing, or framing ideas before submitting.",
  },
];

type FormState = {
  artwork: string;
  size: string;
  material: string;
  name: string;
  email: string;
  phone: string;
  framing: string;
  message: string;
};

const initialFormState: FormState = {
  artwork: "",
  size: "",
  material: "",
  name: "",
  email: "",
  phone: "",
  framing: "",
  message: "",
};

export function PrintInquiryForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);

  const selectedArtwork = useMemo(
    () => artworks.find((artwork) => artwork.title === form.artwork),
    [form.artwork],
  );

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function canContinue() {
    return isStepComplete(activeStep);
  }

  function isStepComplete(step: number) {
    if (step === 0) return Boolean(form.artwork);
    if (step === 1) return Boolean(form.size && form.material);
    if (step === 2) return Boolean(form.name && form.email && form.framing);
    return true;
  }

  function canVisitStep(step: number) {
    if (step <= activeStep) return true;
    return steps.slice(0, step).every((_, index) => isStepComplete(index));
  }

  function canSubmit() {
    return steps.every((_, index) => isStepComplete(index));
  }

  function nextStep() {
    if (canContinue()) {
      setActiveStep((current) => Math.min(current + 1, steps.length - 1));
    }
  }

  function previousStep() {
    setActiveStep((current) => Math.max(current - 1, 0));
  }

  function resetForm() {
    setSubmitted(false);
    setForm(initialFormState);
    setActiveStep(0);
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
            <strong>Artwork:</strong> {form.artwork}
          </p>
          <p>
            <strong>Print:</strong> {form.size} on {form.material}
          </p>
          <p>
            <strong>Framing:</strong> {form.framing}
          </p>
        </div>
        <button type="button" className="btn-secondary mt-8" onClick={resetForm}>
          Start Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit()) {
          setSubmitted(true);
        }
      }}
    >
      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            className={`rounded-2xl border p-3 text-left transition ${
              activeStep === index
                ? "border-stone-950 bg-stone-950 text-white"
                : canVisitStep(index)
                  ? "border-stone-200 bg-[#fbf8f1] text-stone-500 hover:border-stone-400"
                  : "cursor-not-allowed border-stone-100 bg-stone-50 text-stone-300"
            }`}
            disabled={!canVisitStep(index)}
            onClick={() => {
              if (canVisitStep(index)) {
                setActiveStep(index);
              }
            }}
          >
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em]">
              {step.eyebrow}
            </span>
            <span className="mt-1 block text-sm font-semibold">{step.title}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[24rem]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          {steps[activeStep].eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-4xl leading-none text-stone-950 md:text-5xl">
          {steps[activeStep].title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
          {steps[activeStep].copy}
        </p>

        {activeStep === 0 ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
            <label className="field-label">
              Selected artwork
              <select
                required
                name="artwork"
                value={form.artwork}
                className="field-input"
                onChange={(event) => updateField("artwork", event.target.value)}
              >
                <option value="">Choose a piece</option>
                {artworks.map((artwork) => (
                  <option key={artwork.id} value={artwork.title}>
                    {artwork.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="rounded-2xl border border-stone-200 bg-[#fbf8f1] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                Selected piece
              </p>
              <p className="mt-3 font-serif text-3xl text-stone-950">
                {selectedArtwork?.title || "No artwork selected"}
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {selectedArtwork?.description ||
                  "Pick an artwork and the next step will ask for print details."}
              </p>
            </div>
          </div>
        ) : null}

        {activeStep === 1 ? (
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
          </div>
        ) : null}

        {activeStep === 2 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
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
        ) : null}

        {activeStep === 3 ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
            <label className="field-label">
              Message
              <textarea
                name="message"
                rows={8}
                value={form.message}
                className="field-input resize-none"
                placeholder="Tell Christine about the piece, room, deadline, or framing ideas."
                onChange={(event) => updateField("message", event.target.value)}
              />
            </label>
            <div className="rounded-2xl border border-stone-200 bg-[#fbf8f1] p-5 text-sm leading-7 text-stone-700">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                Review
              </p>
              <p className="mt-4">
                <strong>Artwork:</strong> {form.artwork || "Not selected"}
              </p>
              <p>
                <strong>Size:</strong> {form.size || "Not selected"}
              </p>
              <p>
                <strong>Material:</strong> {form.material || "Not selected"}
              </p>
              <p>
                <strong>Name:</strong> {form.name || "Missing"}
              </p>
              <p>
                <strong>Email:</strong> {form.email || "Missing"}
              </p>
              <p>
                <strong>Framing:</strong> {form.framing || "Not selected"}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {!canContinue() ? (
        <p className="mt-2 rounded-2xl bg-[#f3eee4] p-4 text-sm font-semibold text-stone-700">
          Complete this step to continue.
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-6">
        <button
          type="button"
          className="btn-secondary"
          onClick={previousStep}
          disabled={activeStep === 0}
        >
          Back
        </button>
        {activeStep < steps.length - 1 ? (
          <button type="button" className="btn-primary" onClick={nextStep}>
            Continue
          </button>
        ) : (
          <button type="submit" className="btn-primary" disabled={!canSubmit()}>
            Submit Inquiry
          </button>
        )}
      </div>
    </form>
  );
}
