# Inventory Backend

A backend application for managing inventory, loans, users, and more, built with Node.js, TypeScript, Express, and Prisma.

## Features

- User authentication and authorization with roles (SUPERADMIN, ADMIN, PETUGAS_GUDANG, PIMPINAN, PEMINJAM)
- Item management (CRUD, categories, stock in/out)
- Loan management with approval workflow
- Reports
- Supplier management
- File uploads for item photos
- API documentation with Swagger

## Tech Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer
- **Documentation**: Swagger

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd inventory.Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following:

   ```
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   JWT_SECRET="your_jwt_secret"
   PORT=3000
   ```

4. Run database migrations:

   ```bash
   npm run migrate
   ```

5. Generate Prisma client:

   ```bash
   npm run generate
   ```

6. (Optional) Seed the database:

   ```bash
   npm run seed
   ```

## Usage

### Development

Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

### Production

Build the application:

```bash
npm run build
```

Start the server:

```bash
npm start
```

### API Documentation

Access Swagger UI at `http://localhost:3000/api-docs` for API documentation.

## API Examples

### Authentication

#### Login

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@system.com",
  "password": "admin123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "7c1a5a0f-d68a-410c-b404-517e6cee1f6e",
      "name": "Admin User",
      "email": "admin@system.com",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Brands

#### Create Brand

```bash
POST /brands
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Brand",
  "code": "NBR"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Brand",
    "code": "NBR",
    "isDeleted": false,
    "createdAt": "2025-12-30T16:38:41.121Z",
    "updatedAt": "2025-12-30T16:38:41.121Z"
  }
}
```

#### Get All Brands

```bash
GET /brands
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "d5ab8e6f-b2ac-4a99-8b52-6c696e8b21d3",
      "name": "Brand Example",
      "code": "BRD",
      "isDeleted": false,
      "createdAt": "2025-12-30T16:38:41.546Z",
      "updatedAt": "2025-12-30T16:38:41.546Z"
    }
  ]
}
```

### Categories

#### Create Category

```bash
POST /categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Category",
  "code": "NCT"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Category",
    "code": "NCT",
    "isDeleted": false,
    "createdAt": "2025-12-30T16:38:41.121Z",
    "updatedAt": "2025-12-30T16:38:41.121Z"
  }
}
```

### Items

#### Create Item (Auto-generates itemCode)

```bash
POST /items
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Laptop",
  "brandId": "d5ab8e6f-b2ac-4a99-8b52-6c696e8b21d3",
  "categoryId": "10cbc95f-de40-43e0-993f-b78c693b08a2"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Laptop",
    "brandId": "d5ab8e6f-b2ac-4a99-8b52-6c696e8b21d3",
    "categoryId": "10cbc95f-de40-43e0-993f-b78c693b08a2",
    "itemCode": "BRD-ELC-0002",
    "createdAt": "2025-12-30T16:38:41.121Z",
    "updatedAt": "2025-12-30T16:38:41.121Z",
    "brand": {
      "id": "d5ab8e6f-b2ac-4a99-8b52-6c696e8b21d3",
      "name": "Brand Example",
      "code": "BRD",
      "isDeleted": false,
      "createdAt": "2025-12-30T16:38:41.546Z",
      "updatedAt": "2025-12-30T16:38:41.546Z"
    },
    "category": {
      "id": "10cbc95f-de40-43e0-993f-b78c693b08a2",
      "name": "Electronics",
      "code": "ELC",
      "isDeleted": false,
      "createdAt": "2025-12-30T16:38:41.557Z",
      "updatedAt": "2025-12-30T16:38:41.557Z"
    }
  }
}
```

#### Get All Items

```bash
GET /items
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "f27fe057-6d41-4c06-89b4-a1c0fc20c79b",
      "name": "Laptop",
      "brandId": "d5ab8e6f-b2ac-4a99-8b52-6c696e8b21d3",
      "categoryId": "10cbc95f-de40-43e0-993f-b78c693b08a2",
      "itemCode": "BRD-ELC-0001",
      "createdAt": "2025-12-30T16:38:41.572Z",
      "updatedAt": "2025-12-30T16:38:41.572Z",
      "brand": {
        "id": "d5ab8e6f-b2ac-4a99-8b52-6c696e8b21d3",
        "name": "Brand Example",
        "code": "BRD",
        "isDeleted": false,
        "createdAt": "2025-12-30T16:38:41.546Z",
        "updatedAt": "2025-12-30T16:38:41.546Z"
      },
      "category": {
        "id": "10cbc95f-de40-43e0-993f-b78c693b08a2",
        "name": "Electronics",
        "code": "ELC",
        "isDeleted": false,
        "createdAt": "2025-12-30T16:38:41.557Z",
        "updatedAt": "2025-12-30T16:38:41.557Z"
      }
    }
  ]
}
```

## Project Structure

- `src/`: Source code
  - `app.ts`: Express app setup
  - `server.ts`: Server entry point
  - `routes.ts`: Main routes
  - `config/`: Configuration files
  - `features/`: Feature modules (items, loans, etc.)
  - `middlewares/`: Custom middlewares
  - `modules/`: Additional modules (auth, user, etc.)
  - `shared/`: Shared utilities
- `prisma/`: Database schema and migrations
- `uploads/`: Uploaded files

## Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Start production server
- `npm run migrate`: Run Prisma migrations
- `npm run generate`: Generate Prisma client
- `npm run seed`: Seed the database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC
