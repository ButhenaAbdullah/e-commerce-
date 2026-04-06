import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { getFeaturedProducts } from "@/lib/data/products";

export function FeaturedSection() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Curated for You
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
              Featured Pieces
            </h2>
          </div>
          <Button
            asChild
            variant="link"
            className="mt-4 lg:mt-0 p-0 text-xs tracking-widest uppercase text-foreground"
          >
            <Link href="/shop">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={featuredProducts} columns={4} />
      </div>
    </section>
  );
}
