import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "356",
    change: "+15.3%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "48",
    change: "+4",
    trend: "up",
    icon: Package,
  },
  {
    title: "Customers",
    value: "2,345",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@email.com",
    product: "Cashmere Cocoon Coat",
    amount: "$1,250.00",
    status: "Shipped",
  },
  {
    id: "ORD-002",
    customer: "Emily Chen",
    email: "emily@email.com",
    product: "Ethereal Silk Blouse",
    amount: "$385.00",
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Maria Garcia",
    email: "maria@email.com",
    product: "Botanical Linen Dress",
    amount: "$445.00",
    status: "Delivered",
  },
  {
    id: "ORD-004",
    customer: "Alexandra Smith",
    email: "alex@email.com",
    product: "Cloud Cashmere Sweater",
    amount: "$525.00",
    status: "Processing",
  },
  {
    id: "ORD-005",
    customer: "Isabella Brown",
    email: "isabella@email.com",
    product: "Palazzo Wide-Leg Trousers",
    amount: "$295.00",
    status: "Shipped",
  },
];

const topProducts = [
  { name: "Cashmere Cocoon Coat", sales: 45, revenue: "$56,250" },
  { name: "Cloud Cashmere Sweater", sales: 38, revenue: "$19,950" },
  { name: "Ethereal Silk Blouse", sales: 32, revenue: "$12,320" },
  { name: "Botanical Linen Dress", sales: 28, revenue: "$12,460" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back. Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
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
                      Product
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border">
                      <td className="py-4 text-sm font-medium">{order.id}</td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium">
                            {order.customer}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground hidden md:table-cell">
                        {order.product}
                      </td>
                      <td className="py-4 text-sm font-medium">
                        {order.amount}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-muted rounded-full text-xs font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{product.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
