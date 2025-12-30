"use client";

// components/senda/SendaShell.tsx
import React from "react";

export default function SendaShell({
  title,
  subtitle,
  children,
  backHref,
  backLabel = "Volver",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        {backHref ? (
          <a
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-slate-100 transition"
          >
            ← {backLabel}
          </a>
        ) : null}

        <header className="space-y-2">
          <div className="text-sm text-slate-300">La Senda</div>
          <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
          {subtitle ? <p className="text-slate-300">{subtitle}</p> : null}
        </header>

        <section className="space-y-4">{children}</section>
      </div>
    </main>
  );
}
