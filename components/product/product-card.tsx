"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toggleWishlist } from "@/lib/store/wishlistSlice";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import type { RootState } from "@/lib/store/store";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );
  const isInWishlist = wishlistItems.some(
    (item) => item.productId === product.id
  );

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className={cn("group relative", className)}>
      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-muted"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image */}
          <Image
            src={product.images.main || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-500 ease-in-out",
              isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Hover Image */}
          <Image
            src={product.images.hover || "/placeholder.svg"}
            alt={`${product.name} - alternate view`}
            fill
            className={cn(
              "object-cover transition-all duration-500 ease-in-out",
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-primary text-primary-foreground text-[10px] tracking-widest uppercase px-3 py-1">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-accent text-accent-foreground text-[10px] tracking-widest uppercase px-3 py-1">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300",
              isHovered || isInWishlist
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            )}
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isInWishlist
                  ? "fill-accent text-accent"
                  : "fill-transparent text-foreground"
              )}
            />
            <span className="sr-only">
              {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            </span>
          </Button>

          {/* Quick Add Button */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
<Button
  asChild
  variant="secondary"
  className="w-full text-xs tracking-widest uppercase"
  onClick={(e) => {
    e.stopPropagation(); // فقط لمنع أي حدث خارجي، بدون preventDefault
    // هنا ممكن تضيف أي منطق للـ Quick Add
  }}
>
  <Link href={`/product/${product.id}`}>
    Quick View
  </Link>
</Button>

          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            {product.category}
          </p>
          <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color Options */}
          <div className="flex items-center gap-1 pt-2">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
