"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { products, categories } from "@/lib/data/products";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
];

const priceRanges = [
  { id: "under-300", label: "Under $300", min: 0, max: 300 },
  { id: "300-500", label: "$300 - $500", min: 300, max: 500 },
  { id: "500-800", label: "$500 - $800", min: 500, max: 800 },
  { id: "over-800", label: "Over $800", min: 800, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const initialCategory = searchParams.get("category");
    return initialCategory ? [initialCategory] : [];
  });
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategories(category ? [category] : []);
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.categorySlug)
      ) {
        return false;
      }
      if (selectedPrices.length > 0) {
        const inRange = selectedPrices.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          if (!range) return false;
          return product.price >= range.min && product.price < range.max;
        });
        if (!inRange) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const togglePrice = (id: string) => {
    setSelectedPrices((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
  };

  const activeFiltersCount = selectedCategories.length + selectedPrices.length;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-xs tracking-widest uppercase font-medium mb-4">
          Category
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={`cat-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
              />
              <label
                htmlFor={`cat-${category.slug}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs tracking-widest uppercase font-medium mb-4">
          Price
        </h3>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center gap-3">
              <Checkbox
                id={`price-${range.id}`}
                checked={selectedPrices.includes(range.id)}
                onCheckedChange={() => togglePrice(range.id)}
              />
              <label
                htmlFor={`price-${range.id}`}
                className="text-sm cursor-pointer"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full text-xs tracking-widest uppercase bg-transparent"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-28 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl text-foreground">
              All Collections
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Explore our complete range of luxury pieces, each crafted with
              exceptional care and attention to detail.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden text-xs tracking-widest uppercase bg-transparent"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-[10px] flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-background">
                  <SheetHeader>
                    <SheetTitle className="text-left text-xs tracking-widest uppercase">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-sm text-muted-foreground hidden sm:block">
                {filteredProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 text-sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>
              {selectedCategories.map((slug) => {
                const category = categories.find((c) => c.slug === slug);
                return (
                  <Button
                    key={slug}
                    variant="secondary"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => toggleCategory(slug)}
                  >
                    {category?.name}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                );
              })}
              {selectedPrices.map((id) => {
                const range = priceRanges.find((r) => r.id === id);
                return (
                  <Button
                    key={id}
                    variant="secondary"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => togglePrice(id)}
                  >
                    {range?.label}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                );
              })}
              <Button
                variant="link"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterContent />
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No products match your filters.
                  </p>
                  <Button
                    variant="link"
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <ReduxProvider>
      <ShopContent />
    </ReduxProvider>
  );
}
