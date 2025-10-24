# FixerUpper Backend API

## Project Description

**FixerUpper** is a backend API for an online store specializing in tools and repair equipment. The project is built on Node.js using Express.js and PostgreSQL, and includes a complete set of features for user management, products, shopping carts, and orders.

### Key Features

- **User Management**: registration, authentication, Google OAuth
- **Product Catalog**: CRUD operations, categories, statuses
- **Shopping Cart**: add/remove items, quantity management
- **Order System**: create, view, manage orders
- **Security**: comprehensive protection against various attack types

### Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT tokens, Google OAuth
- **File Storage**: Cloudinary for image storage
- **Security**: Helmet, CORS, Rate Limiting, CSRF protection
- **Validation**: Joi schemas
- **Logging**: Morgan

## Quick Start

### Prerequisites

- Node.js (version 18 or newer)
- PostgreSQL (version 12 or newer)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZorAnderius/fixerUpper-back.git
   cd fixerUpper-back
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_DIALECT=postgres
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=fixerupper_db

   # JWT tokens
   JWT_ACCESS_SECRET=your_access_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret_key

   # Cloudinary (optional)
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ENABLE_CLOUDINARY=true

   # Google OAuth (optional)
   GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
   GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
   GOOGLE_OAUTH_REDIRECT_URI=https://yourdomain.com/api/users/confirm-oauth
   GOOGLE_OAUTH_REDIRECT_URI_LOCAL=http://localhost:3000/api/users/confirm-oauth

   # Server
   NODE_ENV=development
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb fixerupper_db
   
   # Run migrations and seeds
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Main Endpoints

#### Users (`/api/users`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /request-google-oauth` - Request Google OAuth
- `GET /confirm-oauth` - Confirm Google OAuth

#### Products (`/api/products`)
- `GET /` - Get products list (with pagination and filters)
- `GET /:id` - Get product by ID
- `POST /` - Create product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)

#### Cart (`/api/carts`)
- `GET /` - Get user's cart
- `POST /items` - Add item to cart
- `PUT /items/:id` - Update item quantity
- `DELETE /items/:id` - Remove item from cart
- `DELETE /` - Clear cart

#### Orders (`/api/orders`)
- `GET /` - Get user's orders list
- `GET /:id` - Get order by ID
- `POST /` - Create order

### Authentication

For protected endpoints, add the header:
```
Authorization: Bearer <access_token>
```

## Security

### Implemented Security Measures

#### 1. **CSRF Attack Protection**
- `X-CSRF-Token` header validation for state-changing HTTP methods
- Origin header validation
- CSRF token support via cookies

#### 2. **Rate Limiting**
- **General API**: 100 requests per minute
- **Authentication**: 5 attempts per 15 minutes
- **Registration**: 3 attempts per 15 minutes
- **Gradual slowdown** for suspicious requests

#### 3. **CORS (Cross-Origin Resource Sharing)**
- Whitelist of allowed domains
- Credentials support for authentication
- HTTP methods and headers restrictions

#### 4. **Helmet Security Headers**
- **Content Security Policy (CSP)**: XSS attack prevention
- **HSTS**: Forced HTTPS usage
- **X-Frame-Options**: Clickjacking prevention
- **X-Content-Type-Options**: MIME sniffing prevention

#### 5. **Data Validation and Sanitization**
- **Joi schemas** for input data validation
- **HTML and URL content sanitization**
- **Special character escaping**
- **Email and phone number validation**

#### 6. **JWT Tokens with Rotation**
- **Access tokens**: short-term (15 minutes)
- **Refresh tokens**: long-term with rotation
- **JTI (JWT ID)**: unique token identifiers
- **Automatic token refresh**

#### 7. **Password Protection**
- **bcrypt** hashing with salt
- **Minimum complexity requirements** for passwords

#### 8. **Logging and Monitoring**
- **Morgan** for HTTP request logging
- **Automatic cleanup** of expired tokens
- **Suspicious activity tracking**

### Threat Examples and Protection

#### **XSS (Cross-Site Scripting)**
**Threat**: Injection of malicious JavaScript code
**Protection**: 
- CSP headers limit script execution
- HTML content sanitization
- Special character escaping

#### **CSRF (Cross-Site Request Forgery)**
**Threat**: Executing actions on behalf of users without their consent
**Protection**:
- CSRF token validation
- Origin header validation
- SameSite cookies

#### **SQL Injection**
**Threat**: SQL code injection through input data
**Protection**:
- Sequelize ORM with parameterized queries
- Input data validation and sanitization

#### **Brute Force Attacks**
**Threat**: Multiple password guessing attempts
**Protection**:
- Rate limiting for authentication
- Gradual slowdown for suspicious activity
- Blocking after multiple failed attempts

#### **Clickjacking**
**Threat**: Hiding malicious elements under legitimate ones
**Protection**:
- X-Frame-Options headers
- CSP frame-ancestors directives

## Database Structure

### Main Tables

- **users** - System users
- **products** - Product catalog
- **categories** - Product categories
- **carts** - User shopping carts
- **cart_items** - Items in carts
- **orders** - Orders
- **order_items** - Items in orders
- **refresh_tokens** - Authentication refresh tokens

### Table Relationships

- User → Cart (1:1)
- User → Orders (1:M)
- Product → Category (M:1)
- Cart → Cart Items (1:M)
- Order → Order Items (1:M)

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Test Data & Examples

### Sample User Accounts

#### Regular Customer
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "password": "SecurePass123!",
  "role": "customer"
}
```

#### Administrator
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@fixerupper.com",
  "phoneNumber": "+1987654321",
  "password": "AdminPass456!",
  "role": "administrator"
}
```

### Sample Products

#### Hand Tools
```json
{
  "title": "Professional Hammer Set",
  "description": "Heavy-duty claw hammer with fiberglass handle",
  "price": 29.99,
  "quantity": 50,
  "category_id": "hand-tools-category-id",
  "status_id": "available-status-id"
}
```

#### Power Tools
```json
{
  "title": "Cordless Drill Driver",
  "description": "18V lithium-ion battery drill with LED light",
  "price": 89.99,
  "quantity": 25,
  "category_id": "power-tools-category-id",
  "status_id": "best-seller-status-id"
}
```

### API Testing Examples

#### 1. User Registration
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phoneNumber": "+1555123456",
    "password": "MySecurePass789!"
  }'
```

#### 2. User Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "MySecurePass789!"
  }'
```

#### 3. Get Products (with pagination)
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=10&category=Hand%20Tools"
```

#### 4. Add Item to Cart (requires authentication)
```bash
curl -X POST http://localhost:3000/api/carts/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "X-CSRF-Token: YOUR_CSRF_TOKEN" \
  -d '{
    "product_id": "product-uuid-here",
    "quantity": 2
  }'
```

#### 5. Create Order (requires authentication)
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "X-CSRF-Token: YOUR_CSRF_TOKEN" \
  -d '{
    "shipping_address": "123 Main St, City, State 12345",
    "payment_method": "credit_card"
  }'
```

### Test Categories Available
- Hand Tools
- Power Tools
- Measuring Tools
- Cutting Tools
- Fasteners & Hardware
- Safety Gear
- Tool Storage
- Construction Tools
- Gardening Tools
- Automotive Tools

### Test Product Statuses
- `available` - Product is in stock
- `out_of_stock` - Product temporarily unavailable
- `best_seller` - Popular product
- `unavailable` - Product not available
- `discontinued` - Product no longer sold
- `coming_soon` - Product will be available soon
- `limited_edition` - Special limited product

### Environment Variables for Testing

Create a `.env.test` file for testing:
```env
NODE_ENV=test
PORT=3001
DB_DATABASE=fixerupper_test_db
JWT_ACCESS_SECRET=test_access_secret
JWT_REFRESH_SECRET=test_refresh_secret
```

### Postman Collection

You can import these endpoints into Postman:

1. **Base URL**: `http://localhost:3000/api`
2. **Headers for authenticated requests**:
   - `Authorization: Bearer {access_token}`
   - `X-CSRF-Token: {csrf_token}`
   - `Content-Type: application/json`

### Sample JWT Token Structure
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "iat": 1640995200,
  "exp": 1640996100
}
```

## Deployment

### Local Deployment

1. Install dependencies: `npm install`
2. Configure `.env` file
3. Create PostgreSQL database
4. Run migrations: `npm run seed`
5. Start server: `npm start`

### Production Deployment

1. Set environment variables on server
2. Configure PostgreSQL database
3. Install SSL certificate for HTTPS
4. Configure reverse proxy (nginx)
5. Run with PM2 or similar process manager

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you have questions or issues, create an issue in the GitHub repository.

---

**Note**: This project is created for educational purposes and demonstrates modern practices for developing secure web applications.