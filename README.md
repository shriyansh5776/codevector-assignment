# CodeVector Assignment - Product Catalog API

## Overview

live-server: "https://codevector-assignment-dwcw.onrender.com/"

This project is a backend API for browsing a large product catalog containing **200,000 products**.

The API provides:

* Cursor based pagination
* Category filtering
* Stable ordering using `(createdAt, id)`
* Bulk seeded data using Prisma
* Query validation
* Health check endpoint

The project is built to efficiently handle large datasets and avoid duplicate or missing records while paginating.

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL (Neon)
* Prisma ORM
* Faker.js
* Nodemon

---

## Database Schema

### Category Enum

```prisma
enum Category {
  ELECTRONICS
  BOOKS
  FASHION
  SPORTS
  HOME
  BEAUTY
}
```

### Product Model

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  category    Category
  price       Float

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@index([createdAt])
  @@index([createdAt, id])
}
```

---

## Seeding Strategy

The database is populated with **200,000 products**.

### Approach

* Total Products: 200,000
* Batch Size: 5,000
* Total Batches: 40
* Insertion Method: `createMany()`

Bulk insertion was used to:

* Reduce database round trips
* Improve insertion speed
* Reduce memory usage
* Make the seeding process scalable

---

## Cursor Pagination

This project uses **Cursor Pagination** instead of Offset Pagination.

### Ordering

```sql
ORDER BY createdAt DESC, id DESC
```

### Why Cursor Pagination?

Offset pagination:

* Can show duplicate records
* Can miss records when new rows are inserted
* Becomes slower for large datasets

Cursor pagination:

* Stable ordering
* No duplicates
* No missing records
* Better performance for large tables

---

## API Endpoints

### Health Check

```http
GET /api/health
```

Response:

```json
{
  "success": true,
  "status": "ok",
  "database": "connected"
}
```

---

### Get Products

```http
GET /api/products
```

#### Query Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| category  | String | Filter by category          |
| limit     | Number | Number of records to return |
| createdAt | Date   | Cursor createdAt            |
| id        | String | Cursor id                   |

---

### First Page

```http
GET /api/products?limit=20
```

---

### Filter by Category

```http
GET /api/products?category=BOOKS&limit=20
```

---

### Next Page

```http
GET /api/products?limit=20&createdAt=2026-06-23T01:10:42.145Z&id=cmqq8k99b0gujrqmg9zyxi400
```

---

### Response Format

```json
{
  "success": true,
  "hasNextPage": true,

  "nextCursor": {
    "createdAt": "2026-06-23T01:10:42.145Z",
    "id": "cmqq8k99b0gujrqmg9zyxi400"
  },

  "products": []
}
```

---

## Validation

The API validates:

* Invalid categories
* Invalid limits
* Invalid dates
* Out of range limits

Examples:

```http
GET /api/products?category=CRICKET
```

```http
GET /api/products?limit=1000
```

```http
GET /api/products?createdAt=abcd
```

All invalid requests return:

```json
{
  "success": false,
  "message": "Invalid query parameters"
}
```

---

## Installation

```bash
git clone https://github.com/shriyansh5776/codevector-assignment

cd codevector-assignment

npm install

npx prisma migrate dev

node prisma/seed.js

npm run dev
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://neondb_owner:npg_5CJORD7FpgLj@ep-summer-forest-atdo8v16-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

PORT=5000
```

---

## Features

* 200,000 seeded products
* Category Enum
* Bulk Insertion
* Cursor Pagination
* Stable Ordering
* Validation Middleware
* Health Check Endpoint
* PostgreSQL + Prisma
