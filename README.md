# 🇮🇳 BHARAT CONNECT - Backend API

## Overview

Backend API for BHARAT CONNECT - India's First Super App

Built with Node.js, Express, TypeScript, and Supabase.

## 🚀 Features

- **Authentication**: JWT-based auth with bcrypt password hashing
- **Health Hub API**: Manage health records, appointments, prescriptions
- **Skill Marketplace API**: Courses, enrollments, certifications
- **Document Vault API**: Secure document storage and retrieval
- **Business Hub API**: Inventory, invoicing, customer management
- **User Management**: Profile management, settings

## 🛠️ Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcrypt
- **Validation**: Zod + express-validator

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Health
- `GET /api/health/records` - Get health records
- `POST /api/health/records` - Create health record

### Documents
- `GET /api/documents` - Get all documents
- `POST /api/documents/upload` - Upload document

### Skills
- `GET /api/skills/courses` - Get all courses
- `POST /api/skills/enroll` - Enroll in course

### Business
- `GET /api/business/inventory` - Get inventory
- `POST /api/business/invoice` - Create invoice

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Health Records Table
```sql
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  record_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Documents Table
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  category VARCHAR(100),
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Courses Table
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor VARCHAR(255),
  duration_hours INTEGER,
  language VARCHAR(50),
  level VARCHAR(50),
  price DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Inventory Table
```sql
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  sku VARCHAR(100),
  quantity INTEGER DEFAULT 0,
  unit_price DECIMAL(10,2),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Deployment

### Deploy to Railway

1. Create Railway account
2. Connect GitHub repository
3. Add environment variables
4. Deploy

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

## 🔒 Security

- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Helmet.js security headers
- Input validation
- SQL injection prevention

## 📈 Performance

- Connection pooling
- Query optimization
- Caching strategies
- Rate limiting (coming soon)

## 🧪 Testing

```bash
# Run tests (coming soon)
npm test
```

## 📄 License

Copyright © 2024 BHARAT CONNECT. All rights reserved.

---

Made with ❤️ in India 🇮🇳