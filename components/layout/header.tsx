"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Search, Heart, ShoppingBag, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { selectCartCount, toggleCart } from "@/lib/store/cartSlice";
import { selectWishlistCount } from "@/lib/store/wishlistSlice";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const navigation = {
  en: [
    { name: "New Arrivals", href: "/shop?filter=new" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ],
  ar: [
    { name: "وصل حديثاً", href: "/shop?filter=new" },
    { name: "المجموعات", href: "/collections" },
    { name: "من نحن", href: "/about" },
  ],
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const dispatch = useDispatch();
  const { locale, isArabic, setLocale } = useLanguage();
  
  const navItems = navigation[locale];

  // Handle language toggle
  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <p className={`text-xs tracking-widest uppercase ${isArabic ? "font-arabic" : ""}`}>
          {isArabic ? "شحن مجاني للطلبات التي تزيد عن 500 دولار" : "Complimentary shipping on orders over $500"}
        </p>
      </div>

      <nav className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16 lg:h-20">
          {/* Left side - Mobile menu or Desktop Navigation */}
          <div className="flex items-center justify-start">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side={isArabic ? "right" : "left"} className="w-80 bg-background">
                  <SheetHeader>
                    <SheetTitle className="font-serif text-2xl tracking-wide">
                      MAISON
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-base tracking-wide text-foreground hover:text-accent transition-colors ${isArabic ? "font-arabic text-right" : ""}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-border">
                    <button 
                      onClick={toggleLanguage}
                      className="flex items-center gap-4 w-full hover:text-accent transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">{isArabic ? "English" : "العربية"}</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation - Left */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs tracking-widest uppercase text-foreground hover:text-accent transition-colors ${isArabic ? "font-arabic" : ""}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="font-serif text-2xl lg:text-3xl tracking-widest text-foreground"
            >
              MAISON
            </Link>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center justify-end gap-2 lg:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-foreground"
              onClick={toggleLanguage}
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">Change language</span>
            </Button>
            {/* <Button variant="ghost" size="icon" className="text-foreground">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button> */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-foreground"
            >
              <User className="h-4 w-4" />
              <span className="sr-only">Account</span>
            </Button> */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative text-foreground">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground"
              onClick={() => dispatch(toggleCart())}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}