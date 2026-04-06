"use client";

import React from "react"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
            Join the MAISON World
          </h2>
          <p className="mt-4 text-muted-foreground">
            Be the first to discover new collections, exclusive offers, and
            style inspiration delivered directly to your inbox.
          </p>

          {submitted ? (
            <div className="mt-8 p-6 bg-background border border-border">
              <p className="font-serif text-xl text-foreground">
                Welcome to MAISON
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you for subscribing. Your first exclusive access awaits.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background"
              />
              <Button
                type="submit"
                className="text-xs tracking-widest uppercase px-8"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </div>
    </section>
  );
}
