"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ReduxProvider } from "@/components/providers/redux-provider";
import Image from "next/image";

function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-28 pb-16 lg:pb-24">
        <section className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-lg">
              <Image
                src="/images/collections/modern-classics.jpg"
                alt="Maison atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                Our Story
              </p>
              <h1 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight">
                Crafted With Intention
              </h1>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  MAISON was founded with a simple belief: luxury should feel
                  personal, purposeful, and enduring. We partner with select
                  ateliers across Europe to create limited collections that
                  balance modern silhouettes with timeless craftsmanship.
                </p>
                <p>
                  Every fabric is chosen for its feel and longevity. Every
                  stitch is considered. From sketch to final press, we pursue a
                  slower, more thoughtful approach so each piece becomes a
                  wardrobe staple rather than a season&apos;s trend.
                </p>
                <p>
                  Beyond the garment, we commit to transparent production,
                  responsible sourcing, and meaningful relationships with the
                  artisans who bring our designs to life.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <p className="font-serif text-3xl text-foreground">15+</p>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    Years of Craft
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-foreground">50+</p>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    Artisan Partners
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-foreground">100%</p>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    Traceable Materials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 lg:px-8 mt-16 lg:mt-20">
          <div className="bg-muted/40 border border-border rounded-lg p-8 lg:p-12 grid lg:grid-cols-3 gap-8">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">
                Design Philosophy
              </h2>
              <p className="text-muted-foreground">
                Quiet confidence, precise tailoring, and materials that feel as
                good as they look.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">
                Ethical Production
              </h2>
              <p className="text-muted-foreground">
                Small-batch manufacturing, fair partnerships, and transparent
                sourcing at every stage.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">
                Long-Term Care
              </h2>
              <p className="text-muted-foreground">
                Care guides and repair support to help each piece last for
                seasons to come.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <ReduxProvider>
      <AboutContent />
    </ReduxProvider>
  );
}
