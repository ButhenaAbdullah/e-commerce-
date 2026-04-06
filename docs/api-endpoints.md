# MAISON E-Commerce API Documentation

## Base URL
```
Production: https://api.maison.com/v1
Development: http://localhost:3000/api/v1
```

## Authentication

All protected endpoints require JWT authentication via Bearer token in the Authorization header.

```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### POST /auth/register
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "Jane",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /auth/logout
Invalidate current JWT token.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

---

## Products Endpoints

### GET /products
Retrieve paginated list of products with filtering options.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 12) |
| category | string | Filter by category slug |
| minPrice | number | Minimum price filter |
| maxPrice | number | Maximum price filter |
| sort | string | Sort by: `newest`, `price_asc`, `price_desc`, `name` |
| featured | boolean | Filter featured products |
| new | boolean | Filter new arrivals |
| search | string | Search in name and description |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "sku": "SKU-001",
        "name": "Ethereal Silk Blouse",
        "nameAr": "بلوزة حرير أثيرية",
        "slug": "ethereal-silk-blouse",
        "description": "Crafted from the finest mulberry silk...",
        "price": 385.00,
        "originalPrice": null,
        "category": {
          "id": 3,
          "name": "Tops",
          "slug": "tops"
        },
        "images": [
          {
            "url": "/images/products/silk-blouse-1.jpg",
            "isPrimary": true,
            "isHover": false
          },
          {
            "url": "/images/products/silk-blouse-1-hover.jpg",
            "isPrimary": false,
            "isHover": true
          }
        ],
        "colors": [
          { "name": "Ivory", "hex": "#FFFEF5" },
          { "name": "Champagne", "hex": "#F7E7CE" }
        ],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "isFeatured": true,
        "isNew": true,
        "rating": 4.9,
        "reviewCount": 47
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 48,
      "itemsPerPage": 12
    }
  }
}
```

### GET /products/:id
Retrieve single product by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "SKU-001",
    "name": "Ethereal Silk Blouse",
    "nameAr": "بلوزة حرير أثيرية",
    "slug": "ethereal-silk-blouse",
    "description": "Crafted from the finest mulberry silk...",
    "descriptionAr": "مصنوع من أجود أنواع الحرير...",
    "price": 385.00,
    "originalPrice": null,
    "category": {
      "id": 3,
      "name": "Tops",
      "slug": "tops"
    },
    "images": [...],
    "colors": [...],
    "sizes": [
      { "size": "XS", "inStock": true, "quantity": 10 },
      { "size": "S", "inStock": true, "quantity": 15 },
      { "size": "M", "inStock": true, "quantity": 20 },
      { "size": "L", "inStock": true, "quantity": 15 },
      { "size": "XL", "inStock": true, "quantity": 10 }
    ],
    "isFeatured": true,
    "isNew": true,
    "material": "100% Mulberry Silk",
    "madeIn": "Italy",
    "careInstructions": "Dry clean only...",
    "rating": 4.9,
    "reviewCount": 47
  }
}
```

### GET /products/slug/:slug
Retrieve product by URL slug.

---

## Categories Endpoints

### GET /categories
Retrieve all categories.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dresses",
      "nameAr": "فساتين",
      "slug": "dresses",
      "description": "Elegant dresses for every occasion",
      "image": "/images/collections/evening-wear.jpg",
      "productCount": 24
    }
  ]
}
```

### GET /categories/:slug/products
Retrieve all products in a category.

---

## Cart Endpoints

### GET /cart
Retrieve current user's cart.

**Headers:** `Authorization: Bearer <token>` (optional for guest cart)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "items": [
      {
        "id": 1,
        "product": {
          "id": 2,
          "name": "Cashmere Cocoon Coat",
          "image": "/images/products/cashmere-coat-1.jpg",
          "price": 1250.00
        },
        "size": "M",
        "color": "Camel",
        "quantity": 1,
        "subtotal": 1250.00
      }
    ],
    "subtotal": 1250.00,
    "itemCount": 1
  }
}
```

### POST /cart/items
Add item to cart.

**Request Body:**
```json
{
  "productId": 2,
  "size": "M",
  "color": "Camel",
  "quantity": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "cartItem": {
      "id": 1,
      "productId": 2,
      "size": "M",
      "color": "Camel",
      "quantity": 1
    },
    "cart": {...}
  }
}
```

### PATCH /cart/items/:id
Update cart item quantity.

**Request Body:**
```json
{
  "quantity": 2
}
```

### DELETE /cart/items/:id
Remove item from cart.

### DELETE /cart
Clear entire cart.

---

## Wishlist Endpoints

### GET /wishlist
Retrieve user's wishlist.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "items": [
      {
        "id": 1,
        "product": {
          "id": 1,
          "name": "Ethereal Silk Blouse",
          "image": "/images/products/silk-blouse-1.jpg",
          "price": 385.00
        },
        "addedAt": "2026-01-20T10:30:00Z"
      }
    ]
  }
}
```

### POST /wishlist/items
Add product to wishlist.

**Request Body:**
```json
{
  "productId": 1
}
```

### DELETE /wishlist/items/:productId
Remove product from wishlist.

---

## Orders Endpoints

### GET /orders
Retrieve user's orders.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| status | string | Filter by status |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 1,
        "orderNumber": "ORD-001",
        "status": "shipped",
        "items": [
          {
            "productName": "Cashmere Cocoon Coat",
            "size": "M",
            "color": "Camel",
            "quantity": 1,
            "unitPrice": 1250.00
          }
        ],
        "subtotal": 1250.00,
        "shippingCost": 0.00,
        "total": 1250.00,
        "shippingAddress": {
          "firstName": "Sarah",
          "lastName": "Johnson",
          "addressLine1": "123 Fashion Ave",
          "city": "New York",
          "state": "NY",
          "postalCode": "10001",
          "country": "United States"
        },
        "createdAt": "2026-01-20T10:30:00Z",
        "shippedAt": "2026-01-21T14:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### GET /orders/:id
Retrieve single order details.

### POST /orders
Create new order from cart.

**Request Body:**
```json
{
  "shippingAddressId": 1,
  "billingAddressId": 1,
  "paymentMethod": "credit_card",
  "notes": "Please gift wrap"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 2,
      "orderNumber": "ORD-002",
      "status": "pending",
      "total": 680.00
    },
    "paymentIntent": {
      "clientSecret": "pi_xxx_secret_xxx"
    }
  }
}
```

---

## Admin Endpoints

All admin endpoints require `role: admin` in JWT.

### GET /admin/dashboard
Retrieve dashboard statistics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 45231.89,
    "revenueChange": 20.1,
    "totalOrders": 356,
    "ordersChange": 15.3,
    "totalProducts": 48,
    "totalCustomers": 2345,
    "recentOrders": [...],
    "topProducts": [...]
  }
}
```

### GET /admin/products
List all products with admin details.

### POST /admin/products
Create new product.

**Request Body (multipart/form-data):**
```json
{
  "name": "New Product",
  "nameAr": "منتج جديد",
  "categoryId": 1,
  "sku": "SKU-007",
  "price": 299.00,
  "description": "Product description",
  "sizes": ["S", "M", "L"],
  "colors": [{"name": "Black", "hex": "#000000"}],
  "images": [File, File]
}
```

### PATCH /admin/products/:id
Update product.

### DELETE /admin/products/:id
Delete product.

### GET /admin/orders
List all orders.

### PATCH /admin/orders/:id/status
Update order status.

**Request Body:**
```json
{
  "status": "shipped"
}
```

### GET /admin/customers
List all customers.

---

## Reviews Endpoints

### GET /products/:id/reviews
Get reviews for a product.

### POST /products/:id/reviews
Submit a review.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "rating": 5,
  "title": "Absolutely stunning!",
  "content": "The quality is exceptional..."
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Invalid request data |
| UNAUTHORIZED | 401 | Missing or invalid token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists |
| INTERNAL_ERROR | 500 | Server error |
