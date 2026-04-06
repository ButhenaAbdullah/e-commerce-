"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const params = useSearchParams();
  const total = params.get("total");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="container mx-auto px-4 lg:px-8 pt-28 pb-16 lg:pb-24">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
          <div>
            <h1 className="font-serif text-4xl text-foreground">
              Order Confirmed
            </h1>
            <p className="text-muted-foreground mt-3">
              Thank you for your purchase. We&apos;ve emailed your receipt and
              will share shipping details once your order is on its way.
            </p>
          </div>
          <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="font-medium">
                {total ? `$${Number(total).toLocaleString()}` : "—"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium">2–5 business days</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="text-xs tracking-widest uppercase">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="text-xs tracking-widest uppercase bg-transparent"
            >
              <Link href="/admin/orders">View Order Status</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <ReduxProvider>
      <SuccessContent />
    </ReduxProvider>
  );
}
