"use client";

import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight text-foreground">AMPLIFY</h1>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Demo Store</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-card text-card-foreground border border-border rounded-lg p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center size-16 rounded-full bg-success/10">
                <CheckCircle className="size-8 text-success" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground tracking-tight mb-2">Pago Exitoso!</h2>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Tu pago ha sido procesado correctamente
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-medium text-sm py-3 px-6 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <ArrowLeft className="size-4" />
              Seguir Comprando
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            Para leer la documentación completa, visita nuestro{" "}
            <a href="https://getamplify.app" className="underline" target="_blank">
              sitio web
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
