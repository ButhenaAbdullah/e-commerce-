"use client";

import { useState } from "react";
import { Search, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const orders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@email.com",
    address: "123 Fashion Ave, New York, NY 10001",
    items: [
      { name: "Cashmere Cocoon Coat", size: "M", color: "Camel", qty: 1, price: 1250 },
    ],
    subtotal: 1250,
    shipping: 0,
    total: 1250,
    status: "Shipped",
    date: "2026-01-20",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Emily Chen",
    email: "emily@email.com",
    address: "456 Style St, Los Angeles, CA 90001",
    items: [
      { name: "Ethereal Silk Blouse", size: "S", color: "Ivory", qty: 1, price: 385 },
      { name: "Palazzo Wide-Leg Trousers", size: "S", color: "Charcoal", qty: 1, price: 295 },
    ],
    subtotal: 680,
    shipping: 0,
    total: 680,
    status: "Processing",
    date: "2026-01-21",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customer: "Maria Garcia",
    email: "maria@email.com",
    address: "789 Elegance Blvd, Miami, FL 33101",
    items: [
      { name: "Botanical Linen Dress", size: "M", color: "Sage", qty: 1, price: 445 },
    ],
    subtotal: 445,
    shipping: 25,
    total: 470,
    status: "Delivered",
    date: "2026-01-18",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Alexandra Smith",
    email: "alex@email.com",
    address: "321 Luxury Lane, Chicago, IL 60601",
    items: [
      { name: "Cloud Cashmere Sweater", size: "M/L", color: "Oatmeal", qty: 1, price: 525 },
    ],
    subtotal: 525,
    shipping: 0,
    total: 525,
    status: "Processing",
    date: "2026-01-22",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-005",
    customer: "Isabella Brown",
    email: "isabella@email.com",
    address: "654 Premium Plaza, Seattle, WA 98101",
    items: [
      { name: "Sculptural Wrap Blazer", size: "S", color: "Noir", qty: 1, price: 685 },
    ],
    subtotal: 685,
    shipping: 0,
    total: 685,
    status: "Shipped",
    date: "2026-01-19",
    paymentMethod: "Apple Pay",
  },
];

const statusColors: Record<string, string> = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

function Loading() {
  return null;
}

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">
            View and manage customer orders
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID or customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              All Orders ({filteredOrders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Order
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Total
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border">
                      <td className="py-4 text-sm font-medium">{order.id}</td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground hidden md:table-cell">
                        {new Date(order.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 text-sm font-medium">
                        ${order.total.toLocaleString()}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                              </DialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent className="max-w-2xl bg-background">
                            <DialogHeader>
                              <DialogTitle className="font-serif text-2xl">
                                Order {selectedOrder?.id}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6 mt-4">
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                                      Customer
                                    </p>
                                    <p className="font-medium">
                                      {selectedOrder.customer}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedOrder.email}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                                      Shipping Address
                                    </p>
                                    <p className="text-sm">
                                      {selectedOrder.address}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                                      Order Date
                                    </p>
                                    <p className="text-sm">
                                      {new Date(
                                        selectedOrder.date
                                      ).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                                      Payment Method
                                    </p>
                                    <p className="text-sm">
                                      {selectedOrder.paymentMethod}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                                    Items
                                  </p>
                                  <div className="space-y-3">
                                    {selectedOrder.items.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="flex justify-between items-center py-2 border-b border-border"
                                      >
                                        <div>
                                          <p className="font-medium text-sm">
                                            {item.name}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            Size: {item.size} / Color:{" "}
                                            {item.color} / Qty: {item.qty}
                                          </p>
                                        </div>
                                        <p className="font-medium">
                                          ${item.price.toLocaleString()}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-2 pt-4 border-t border-border">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      Subtotal
                                    </span>
                                    <span>
                                      ${selectedOrder.subtotal.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      Shipping
                                    </span>
                                    <span>
                                      {selectedOrder.shipping === 0
                                        ? "Free"
                                        : `$${selectedOrder.shipping}`}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-lg font-medium pt-2 border-t border-border">
                                    <span>Total</span>
                                    <span>
                                      ${selectedOrder.total.toLocaleString()}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                  <Select defaultValue={selectedOrder.status}>
                                    <SelectTrigger className="w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Processing">
                                        Processing
                                      </SelectItem>
                                      <SelectItem value="Shipped">
                                        Shipped
                                      </SelectItem>
                                      <SelectItem value="Delivered">
                                        Delivered
                                      </SelectItem>
                                      <SelectItem value="Cancelled">
                                        Cancelled
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button>Update Status</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
