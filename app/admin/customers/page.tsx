"use client";

import { useState } from "react";
import { Search, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const customers = [
  {
    id: "CUS-001",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+1 (212) 555-1234",
    city: "New York, NY",
    orders: 4,
    total: 3120,
    lastOrder: "2026-01-20",
    status: "VIP",
  },
  {
    id: "CUS-002",
    name: "Emily Chen",
    email: "emily@email.com",
    phone: "+1 (310) 555-5678",
    city: "Los Angeles, CA",
    orders: 2,
    total: 680,
    lastOrder: "2026-01-21",
    status: "Active",
  },
  {
    id: "CUS-003",
    name: "Maria Garcia",
    email: "maria@email.com",
    phone: "+1 (305) 555-9012",
    city: "Miami, FL",
    orders: 3,
    total: 1025,
    lastOrder: "2026-01-18",
    status: "Active",
  },
  {
    id: "CUS-004",
    name: "Alexandra Smith",
    email: "alex@email.com",
    phone: "+1 (312) 555-3456",
    city: "Chicago, IL",
    orders: 1,
    total: 525,
    lastOrder: "2026-01-22",
    status: "New",
  },
];

const statusColor: Record<string, string> = {
  VIP: "bg-amber-100 text-amber-700",
  Active: "bg-green-100 text-green-700",
  New: "bg-blue-100 text-blue-700",
};

export default function AdminCustomersPage() {
  const [query, setQuery] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      c.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-foreground">Customers</h1>
        <p className="text-muted-foreground mt-1">
          View customer details and lifetime value
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((customer) => (
          <Card key={customer.id}>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <Badge className={statusColor[customer.status]}>
                  {customer.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{customer.id}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{customer.city}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="rounded border border-border p-2">
                  <p className="text-xs text-muted-foreground">Orders</p>
                  <p className="font-medium">{customer.orders}</p>
                </div>
                <div className="rounded border border-border p-2">
                  <p className="text-xs text-muted-foreground">Lifetime value</p>
                  <p className="font-medium">${customer.total.toLocaleString()}</p>
                </div>
                <div className="col-span-2 rounded border border-border p-2">
                  <p className="text-xs text-muted-foreground">Last order</p>
                  <p className="font-medium">{customer.lastOrder}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
