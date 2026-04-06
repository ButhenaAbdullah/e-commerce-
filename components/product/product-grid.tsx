import { ProductCard } from "./product-card";
import type { Product } from "@/lib/data/products";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  products,
  title,
  subtitle,
  columns = 4,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-16 lg:py-24">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {subtitle && (
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground text-balance">
              {title}
            </h2>
          )}
        </div>
      )}
      <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
