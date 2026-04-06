"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={`cursor-pointer ${locale === "en" ? "bg-secondary" : ""}`}
        >
          <span className="font-sans">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("ar")}
          className={`cursor-pointer ${locale === "ar" ? "bg-secondary" : ""}`}
        >
          <span className="font-arabic text-base">العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple toggle button variant
export function LanguageToggle() {
  const { locale, setLocale, isArabic } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors hover:text-accent"
    >
      <Globe className="h-4 w-4" />
      <span className={isArabic ? "font-sans" : "font-arabic"}>
        {isArabic ? "EN" : "عربي"}
      </span>
    </button>
  );
}
