import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-fashion.jpg"
          alt="Luxury fashion collection"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-32">
        <div className="max-w-2xl">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Spring/Summer 2026 Collection
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl leading-tight text-foreground text-balance">
            Timeless
            <br />
            Elegance
            <br />
            Redefined
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
            Discover our curated collection of refined essentials, crafted with
            exceptional materials and uncompromising attention to detail.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="text-xs tracking-widest uppercase px-8"
            >
              <Link href="/shop">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-xs tracking-widest uppercase px-8 bg-transparent"
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
}
