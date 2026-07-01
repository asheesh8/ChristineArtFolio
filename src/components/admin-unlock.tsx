"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type AdminUnlockProps = {
  children: ReactNode;
  className?: string;
};

export function AdminUnlock({ children, className }: AdminUnlockProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function unlock() {
    if (username.trim().toUpperCase() === "ART" && password.trim().toUpperCase() === "ART") {
      setError("");
      setOpen(false);
      router.push("/admin");
      return;
    }
    setError("Use ART for both fields.");
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={(event) => {
          if (event.detail >= 3) {
            setOpen(true);
          }
        }}
      >
        {children}
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-stone-950/45 px-5 py-8 backdrop-blur-sm">
          <div className="my-auto w-full max-w-md rounded-[2rem] border border-stone-200 bg-[#fbf8f1] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
                  Studio access
                </p>
                <h2 className="mt-2 font-serif text-4xl text-stone-950">
                  Admin sign in
                </h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-stone-300 px-3 py-1 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="field-label">
                Username
                <input
                  className="field-input"
                  value={username}
                  autoFocus
                  onChange={(event) => setUsername(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") unlock();
                  }}
                />
              </label>
              <label className="field-label">
                Password
                <input
                  className="field-input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") unlock();
                  }}
                />
              </label>
            </div>

            {error ? (
              <p className="mt-4 rounded-2xl bg-white p-3 text-sm font-semibold text-stone-700">
                {error}
              </p>
            ) : null}

            <button type="button" className="btn-primary mt-6 w-full" onClick={unlock}>
              Enter Studio Desk
            </button>
          </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
