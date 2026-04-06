"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectCartItems, selectCartTotal, clearCart } from "@/lib/store/cartSlice";

function CheckoutContent() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPlacing, setIsPlacing] = useState(false);

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="container mx-auto px-4 lg:px-8 pt-28 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="font-serif text-4xl text-foreground">Checkout</h1>
              <p className="text-muted-foreground mt-2">
                Shipping and payment details
              </p>
            </div>

            {isEmpty ? (
              <div className="border border-border rounded-lg p-8 text-center space-y-4">
                <p className="text-muted-foreground">Your bag is empty.</p>
                <Button asChild className="text-xs tracking-widest uppercase">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="border border-border rounded-lg p-6 space-y-4">
                  <h2 className="font-serif text-2xl text-foreground">
                    Contact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Email" type="email" required />
                    <Input placeholder="Phone (optional)" type="tel" />
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-4">
                  <h2 className="font-serif text-2xl text-foreground">
                    Shipping
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="First name" required />
                    <Input placeholder="Last name" required />
                    <Input placeholder="Address" className="md:col-span-2" required />
                    <Input placeholder="City" required />
                    <Input placeholder="State / Province" required />
                    <Input placeholder="ZIP / Postal code" required />
                    <Input placeholder="Country" required />
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-4">
                  <h2 className="font-serif text-2xl text-foreground">
                    Payment
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Card number" required />
                    <Input placeholder="Name on card" required />
                    <Input placeholder="Expiry (MM/YY)" />
                    <Input placeholder="CVC" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Securely processed. We do not store card details.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h2 className="font-serif text-2xl text-foreground">Order Summary</h2>

              {isEmpty ? (
                <p className="text-muted-foreground text-sm">
                  Add items to see your summary.
                </p>
              ) : (
                <>
                  <div className="space-y-4 max-h-80 overflow-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-28 bg-muted flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.size} / {item.color}
                          </p>
                          <p className="text-sm mt-2">
                            ${(item.price * item.quantity).toLocaleString()} — {item.quantity} pcs
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at next step</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxes</span>
                      <span>Calculated at next step</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-border">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full text-xs tracking-widest uppercase"
                    disabled={isPlacing || isEmpty}
                    onClick={() => {
                      if (isEmpty) return;
                      setIsPlacing(true);
                      setTimeout(() => {
                        dispatch(clearCart());
                        router.push(`/checkout/success?total=${total}`);
                      }, 400);
                    }}
                  >
                    {isPlacing ? "Processing..." : "Place Order"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-xs tracking-widest uppercase text-destructive"
                    onClick={() => dispatch(clearCart())}
                  >
                    Empty Bag
                  </Button>
                </>
              )}
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>Need help? <Link href="/about" className="underline">Chat with concierge</Link></p>
              <p>Secure checkout · Free returns within 30 days</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ReduxProvider>
      <CheckoutContent />
    </ReduxProvider>
  );
}
