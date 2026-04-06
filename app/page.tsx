"use client";

import { ReduxProvider } from "@/components/providers/redux-provider";
import { LanguageProvider, useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { HeroSection } from "@/components/sections/hero-section";
import { CategoriesSection } from "@/components/sections/categories-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { StorySection } from "@/components/sections/story-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ProductGrid } from "@/components/product/product-grid";
import { getNewProducts } from "@/lib/data/products";

function HomePage() {
  const newProducts = getNewProducts();
  const { t, isArabic } = useLanguage();

  return (
    <div className={`min-h-screen bg-background ${isArabic ? "font-arabic" : "font-sans"}`}>
      <Header />
      <CartDrawer />

      <main>
        <HeroSection />

        <CategoriesSection />

        <FeaturedSection />

        {/* New Arrivals */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <ProductGrid
              products={newProducts}
              title={isArabic ? "وصل حديثاً" : "New Arrivals"}
              subtitle={isArabic ? "أحدث الإضافات" : "Just Landed"}
              columns={3}
            />
          </div>
        </section>

        <StorySection />

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <LanguageProvider>
      <ReduxProvider>
        <HomePage />
      </ReduxProvider>
    </LanguageProvider>
  );
}
