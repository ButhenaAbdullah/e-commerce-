"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { ReduxProvider } from "@/components/providers/redux-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

function NotFoundContent() {
  const { isArabic } = useLanguage();

  const copy = {
    kicker: isArabic ? "Ø®Ø§Ø±Ø¬ Ø§Ù„ØªØ´ÙƒÙŠÙ„Ø©" : "Off the runway",
    title: isArabic
      ? "Ø¥Ù†Ù‡Ø§ Ø§Ù„Ù„Ø­Ø¸Ø© Ø§Ù„ØªÙŠ Ù„Ù… ØªØµÙ„ Ø¨Ø¹Ø¯."
      : "This look hasn’t made it to the runway yet.",
    body: isArabic
      ? "Ø§Ù„ØµÙØ­Ø© Ø§Ù„ØªÙŠ ØªØ¨Ø­Ø« Ø¹Ù†Ù‡Ø§ ØºÙŠØ± Ù…ØªØ§Ø­Ø©. ØªØµÙÙ‘Ø­ Ø�Ø¬Ù…Ù„ Ù…Ø§ Ù†Ù‚Ø¯Ù‘Ù…Ù‡ Ù…Ù† ØªØµØ§Ù…ÙŠÙ… Ø§Ù„Ù…ÙˆØ¶Ø© ÙˆØ§Ù„Ø´ÙŠÙƒ Ø§Ù„Ù„ÙØ§Øª."
      : "The page you’re looking for is unavailable. Explore our most coveted pieces while we guide you back to the collection.",
    ctaPrimary: isArabic ? "Ø§Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©" : "Back to home",
    ctaSecondary: isArabic ? "ØªØ³ÙˆÙ‚ Ø§Ù„ÙˆØµÙˆÙ„Ø§Øª Ø§Ù„Ø­Ø¯ÙŠØ«Ø©" : "Shop new arrivals",
    concierge: isArabic ? "Ù…Ø*ØªØ§Ø¬ Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§Ù„ØªØ³ÙˆÙ‚ØŸ" : "Need styling assistance?",
    conciergeLink: isArabic ? "ØªÙˆØ§ØµÙ„ Ù…Ø¹ ÙØ±ÙŠÙ‚ Ø§Ù„Ø¹Ù†Ø§ÙŠØ©" : "Contact our concierge",
    quickPicks: [
      { href: "/collections", label: isArabic ? "Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø§Ù„Ù†Ø®Ø¨ÙˆÙŠØ©" : "Curated collections" },
      { href: "/shop?filter=new", label: isArabic ? "ØµÙŠØ­Ø© Ø§Ù„Ù…ÙˆØ¶Ø© Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©" : "Just landed pieces" },
      { href: "/shop/outerwear", label: isArabic ? "Ø®Ù„ÙˆØ¯ Ø§Ù„Ù…Ø¹Ø·Ù" : "Signature outerwear" },
    ],
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "font-arabic" : "font-sans"}`}>
      <Header />
      <CartDrawer />

      <main className="relative flex min-h-screen items-center pt-32 pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/collections/evening-wear.jpg"
            alt="Maison evening wear collection"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/75 to-background/40" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl bg-background/70 backdrop-blur-xl border border-border/60 shadow-2xl p-8 md:p-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {copy.kicker}
            </p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight text-balance">
              {copy.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              {copy.body}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="text-xs tracking-widest uppercase px-7"
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {copy.ctaPrimary}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-xs tracking-widest uppercase px-7 bg-transparent"
              >
                <Link href="/shop?filter=new">{copy.ctaSecondary}</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {copy.quickPicks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block border border-border/60 bg-background/60 p-4 hover:border-foreground transition-colors"
                >
                  <p className="text-sm tracking-wide text-muted-foreground group-hover:text-foreground">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{copy.concierge}</span>
              <Link href="/contact" className="underline underline-offset-4 hover:text-foreground transition-colors">
                {copy.conciergeLink}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function NotFound() {
  return (
    <ReduxProvider>
      <NotFoundContent />
    </ReduxProvider>
  );
}
