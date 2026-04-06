"use client";

import { useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Star, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addToCart, openCart } from "@/lib/store/cartSlice";
import { toggleWishlist } from "@/lib/store/wishlistSlice";
import { getProductById, products } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import type { RootState } from "@/lib/store/store";

function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16 container mx-auto px-4">
          <p>Product not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const isInWishlist = wishlistItems.some(
    (item) => item.productId === product.id
  );

  const images = [product.images.main, product.images.hover];

  const relatedProducts = products
    .filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;

    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images.main,
        size: selectedSize,
        color: selectedColor,
        quantity,
      })
    );
    dispatch(openCart());
  };

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: `wishlist-${product.id}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images.main,
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-28 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/shop"
              className="hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/shop/${product.categorySlug}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                <Image
                  src={images[activeImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-3 py-1">
                    New
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      "relative w-20 h-24 bg-muted overflow-hidden border-2 transition-colors",
                      activeImage === index
                        ? "border-foreground"
                        : "border-transparent"
                    )}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl text-foreground">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-4">
                <span className="font-serif text-2xl text-foreground">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-8">
                <p className="text-xs tracking-widest uppercase mb-3">
                  Color:{" "}
                  <span className="text-muted-foreground">
                    {selectedColor || "Select a color"}
                  </span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor === color.name
                          ? "border-foreground scale-110"
                          : "border-border"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-widest uppercase">
                    Size:{" "}
                    <span className="text-muted-foreground">
                      {selectedSize || "Select a size"}
                    </span>
                  </p>
                  <button className="text-xs underline text-muted-foreground hover:text-foreground transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-12 h-10 px-4 border text-sm transition-colors",
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <p className="text-xs tracking-widest uppercase mb-3">
                  Quantity
                </p>
                <div className="flex items-center border border-border w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-14 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mt-8 flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 text-xs tracking-widest uppercase"
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                >
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleWishlist}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      isInWishlist
                        ? "fill-accent text-accent"
                        : "fill-transparent"
                    )}
                  />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>

              {!selectedSize || !selectedColor ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  Please select a size and color
                </p>
              ) : null}

              {/* Accordion Info */}
              <Accordion type="single" collapsible className="mt-8">
                <AccordionItem value="details">
                  <AccordionTrigger className="text-xs tracking-widest uppercase">
                    Product Details
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Crafted from premium materials</li>
                      <li>Designed for a relaxed yet refined fit</li>
                      <li>Thoughtful details throughout</li>
                      <li>Made in Italy</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care">
                  <AccordionTrigger className="text-xs tracking-widest uppercase">
                    Care Instructions
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Dry clean only</li>
                      <li>Store on padded hanger</li>
                      <li>Iron on low heat if needed</li>
                      <li>Avoid direct sunlight when storing</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-xs tracking-widest uppercase">
                    Shipping & Returns
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Complimentary shipping on all orders over $500. Standard
                      shipping takes 3-5 business days. Express shipping
                      available at checkout.
                    </p>
                    <p className="mt-2">
                      Returns accepted within 14 days of delivery. Items must be
                      unworn with tags attached.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-24">
              <ProductGrid
                products={relatedProducts}
                title="You May Also Like"
                subtitle="Complete the Look"
                columns={4}
              />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <ReduxProvider>
      <ProductDetail params={params} />
    </ReduxProvider>
  );
}
