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
