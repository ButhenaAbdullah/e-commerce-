"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CategoriesSection } from "@/components/sections/categories-section";
import { ProductGrid } from "@/components/product/product-grid";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { getFeaturedProducts, getNewProducts } from "@/lib/data/products";

function CollectionsContent() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-28 pb-16 lg:pb-24">
        <section className="bg-muted/40 border-y border-border">
          <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 text-center">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
              Signature Edit
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl text-foreground">
              Collections Curated for You
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Discover our seasonal statements and enduring essentials. Each
              piece is crafted with meticulous attention to detail, designed to
              live beautifully in your wardrobe.
            </p>
          </div>
        </section>

        <CategoriesSection />

        <div className="container mx-auto px-4 lg:px-8">
          <ProductGrid
            products={featured}
            title="Featured Looks"
            subtitle="Editor's Picks"
            columns={3}
          />

          <ProductGrid
            products={newArrivals}
            title="Just In"
            subtitle="New Arrivals"
            columns={3}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <ReduxProvider>
      <CollectionsContent />
    </ReduxProvider>
  );
}
