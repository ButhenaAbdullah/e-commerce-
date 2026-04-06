"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { type Locale, translations, getDirection, getFontClass } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Record<string, any>;
  direction: "ltr" | "rtl";
  fontClass: string;
  isArabic: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") as Locale | null;
      if (savedLocale && (savedLocale === "en" || savedLocale === "ar")) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
      
      document.documentElement.dir = getDirection(newLocale);
      document.documentElement.lang = newLocale;
      
      document.body.classList.remove("font-sans", "font-arabic");
      document.body.classList.add(getFontClass(newLocale));
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      document.documentElement.dir = getDirection(locale);
      document.documentElement.lang = locale;
      document.body.classList.remove("font-sans", "font-arabic");
      document.body.classList.add(getFontClass(locale));
    }
  }, [locale, mounted]);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
    direction: getDirection(locale),
    fontClass: getFontClass(locale),
    isArabic: locale === "ar",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

interface BilingualTextProps {
  en: string;
  ar: string;
  className?: string;
  as?: React.ElementType;
}

export function BilingualText({ 
  en, 
  ar, 
  className = "", 
  as = "span" 
}: BilingualTextProps) {
  const { locale, isArabic } = useLanguage();
  const text = locale === "ar" ? ar : en;
  
  const Component = as;
  
  return (
    <Component className={`${className} ${isArabic ? "font-arabic" : ""}`}>
      {text}
    </Component>
  );
}

export function useBilingualProduct<T extends { 
  name: string; 
  name_ar?: string; 
  description?: string; 
  description_ar?: string;
}>(product: T) {
  const { locale } = useLanguage();
  
  return {
    ...product,
    displayName: locale === "ar" && product.name_ar ? product.name_ar : product.name,
    displayDescription: locale === "ar" && product.description_ar ? product.description_ar : product.description,
  };
}