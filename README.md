# NestJS Practice Project

A learning repository for practicing NestJS concepts and features from the official documentation.

## Setup

```bash
npm install
```

Create a `.env` file:
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=your_password
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=nestjs_practice
NODE_ENV=development
```

## Running

```bash
# Development
npm run start:dev

# Production
npm run start:prod

# Docker (dev)
docker-compose -f docker-compose.dev.yml up

# Docker (prod)
docker-compose -f docker-compose.prod.yml up
```

## Database Migrations

**Note:** When generating migrations, you must provide the path to the migrations folder where the migration files will be created:

```bash
# Generate migration
npm run migration:generate src/migrations/<migration-name>

# Run migrations
npm run migration:run
```

## Testing

```bash
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage
```

## Code Quality

```bash
npm run format        # Format code
npm run lint          # Lint code
```

## Tech Stack

- NestJS
- TypeORM + MySQL
- Zod validation
- Docker
- Helmet & CORS

## Note

This is an ongoing practice project following the NestJS documentation.
