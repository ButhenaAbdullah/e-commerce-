import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function StorySection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src="/images/collections/autumn-essentials.jpg"
              alt="Our craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl text-foreground leading-tight text-balance">
              Crafted with
              <br />
              Intention
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At MAISON, we believe in the power of thoughtful design. Each
                piece in our collection is crafted with meticulous attention to
                detail, using only the finest materials sourced from around the
                world.
              </p>
              <p>
                Our commitment to quality extends beyond the garment itself. We
                work closely with artisans who share our values, ensuring
                ethical practices at every stage of production.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-xs tracking-widest uppercase bg-transparent"
              >
                <Link href="/about">
                  Discover Our Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-border grid grid-cols-3 gap-8">
              <div>
                <p className="font-serif text-3xl lg:text-4xl text-foreground">
                  15+
                </p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                  Years of Craft
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl text-foreground">
                  50+
                </p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                  Artisan Partners
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl text-foreground">
                  100%
                </p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                  Sustainable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
