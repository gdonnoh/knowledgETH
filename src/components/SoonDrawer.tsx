"use client";

import { useEffect, useState } from "react";

export function SoonDrawer() {
  const [open, setOpen] = useState(true); // open on initial load
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Slight delay for a smoother entrance
    const t = setTimeout(() => setOpen(true), 150);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setOpen(false);
    setDismissed(true);
  }

  function reopen() {
    setOpen(true);
  }

  return (
    <>
      {/* Drawer */}
      <div
        aria-hidden={!open}
        className={`fixed right-4 bottom-6 z-50 transition-all duration-300 ${
          open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="w-72 max-w-[80vw] rounded-xl text-foreground shadow-xl border border-white/10"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%), rgba(17,17,17,0.95)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35), 0 0 30px rgba(255,255,255,0.06)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <span className="text-sm font-semibold">Soon</span>
            <button onClick={dismiss} className="px-2 py-1 text-sm opacity-70 hover:opacity-100">
              ✕
            </button>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm opacity-80">Upcoming notes:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li>Account Abstraction basics</li>
              <li>Rollups and data availability</li>
              <li>ZK proving systems overview</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compact shiny badge when closed */}
      {!open && dismissed && (
        <button
          onClick={reopen}
          className="fixed right-4 bottom-6 z-40 px-3 py-2 text-xs font-medium rounded-xl text-white shadow-xl border border-white/10 hover:opacity-90"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%), #000",
            boxShadow: "0 8px 20px rgba(0,0,0,0.35), 0 0 18px rgba(255,255,255,0.08)",
          }}
        >
          Soon
        </button>
      )}
    </>
  );
}


