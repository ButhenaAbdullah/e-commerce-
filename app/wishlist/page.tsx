"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Button } from "@/components/ui/button";
import { removeFromWishlist } from "@/lib/store/wishlistSlice";
import { selectWishlistItems } from "@/lib/store/wishlistSlice";

function WishlistContent() {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-28 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl text-foreground">
              Wishlist
            </h1>
            <p className="mt-4 text-muted-foreground">
              {items.length === 0
                ? "Your wishlist is empty"
                : `${items.length} item${items.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground/30 mb-6" />
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Start adding your favorite pieces to your wishlist by clicking
                the heart icon on any product.
              </p>
              <Button
                asChild
                className="text-xs tracking-widest uppercase"
              >
                <Link href="/shop">Explore Collections</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {items.map((item) => (
                <div key={item.id} className="group relative">
                  <Link href={`/product/${item.productId}`}>
                    <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-foreground mt-1">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() =>
                        dispatch(removeFromWishlist(item.productId))
                      }
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove from wishlist</span>
                    </Button>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full mt-4 text-xs tracking-widest uppercase"
                    asChild
                  >
                    <Link href={`/product/${item.productId}`}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      View Product
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function WishlistPage() {
  return (
    <ReduxProvider>
      <WishlistContent />
    </ReduxProvider>
  );
}
