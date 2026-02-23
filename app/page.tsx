"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";

interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: "coffee",
    name: "Cafe",
    description: "Un delicioso cafe, perfecto para empezar el dia.",
    price: 1,
    image: "https://images.pexels.com/photos/34591522/pexels-photo-34591522.jpeg",
    category: "Bebidas"
  },
  {
    id: "premium-coffee",
    name: "Cafe Premium",
    description: "Un cafe de alta calidad, con un sabor excepcional.",
    price: 4.99,
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    category: "Bebidas"
  },
  {
    id: "cafe-optional-price",
    name: "Cafe (precio opcional)",
    description: "Ejemplo de producto con precio opcional, ideal para donaciones o propinas.",
    image: "https://images.pexels.com/photos/34591522/pexels-photo-34591522.jpeg",
    category: "Bebidas"
  }
];

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (product: Product) => {
    setLoading(product.id);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          merchantData: {
            name: product.name,
            description: product.description,
            logo: product.image // this should be replaced by your logo
          },
          amount: product.price,
          metadata: {
            productId: product.id,
            category: product.category
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create payment Intent");
      }

      const paymentIntentData = await response.json();

      window.location.href = paymentIntentData.url;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      alert("Error al procesar el pago. Por favor intenta nuevamente.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.getamplify.app/amplify-logo.png"
            alt="Amplify Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Demo</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <section className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Paga con criptomonedas, <span className="text-muted-foreground">simple y seguro</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Descubre nuestros productos y paga de forma segura con criptomonedas usando Amplify
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              loading={loading === product.id}
              onPurchase={handlePurchase}
            />
          ))}
        </section>
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
