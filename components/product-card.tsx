"use client";

import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  loading: boolean;
  onPurchase: (product: Product) => void;
}

export function ProductCard({ product, loading, onPurchase }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-card text-card-foreground border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-40 transition-transform duration-300 group-hover:scale-110 object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground leading-tight">{product.name}</h3>
          <span className="shrink-0 text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{product.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          {product.price && <span className="text-xl font-bold text-foreground tracking-tight">${product.price}</span>}
          <button
            onClick={() => onPurchase(product)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium text-sm py-2.5 px-5 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Procesando...
              </>
            ) : (
              <>{product.category === "Donaciones" ? "Donar" : "Comprar"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
