

````markdown
# Property Listing Project

A full-stack backend API for managing property listings with advanced filtering and caching using
MongoDB, Express.js, and Redis. This project provides endpoints for property CRUD operations, user authentication,
and advanced filtering, optimized with Redis caching for fast responses.

---

## Features

- User Authentication (Register/Login) with JWT
- Property CRUD operations (Create, Read, Update, Delete)
- Advanced property filtering (price, location, amenities, tags, ratings, etc.)
- Redis caching for optimized property retrieval
- Secure API with Helmet, CORS, and Morgan logging
- MongoDB as the primary database
- Deployed on Render (or any other cloud provider)

---

## Technologies Used

- **Node.js** and **Express.js** – backend framework
- **MongoDB** with Mongoose – database and ODM
- **Redis** – caching layer for fast query results
- **JWT** – authentication tokens
- **Helmet**, **CORS**, **Morgan** – middleware for security and logging
- **Dotenv** – environment variables management
- **Render** – cloud deployment

---

## Getting Started

### Prerequisites

- Node.js installed (v14+ recommended)
- MongoDB Atlas account or remote MongoDB URI
- Redis Cloud free-tier instance or Redis server running
- Git installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Property_Listing-Project.git
   cd Property_Listing-Project
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your environment variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   > **Note:** Keep `.env` file secret and do **not** commit it to version control. It is included in `.gitignore`.

### Running the Project Locally

```bash
npm start
```

Your server should be running on `http://localhost:5000`

---

## API Endpoints

### Authentication

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Login and get JWT token

### Properties

* `GET /api/properties` – Get all properties with optional filtering (query params)
* `GET /api/properties/:id` – Get a property by ID
* `POST /api/properties` – Create a new property (protected route)
* `PUT /api/properties/:id` – Update a property by ID (protected route)
* `DELETE /api/properties/:id` – Delete a property by ID (protected route)

---

## Filtering Properties

You can filter properties with query parameters like:

* `city`
* `state`
* `type`
* `furnished` (true/false)
* `isVerified` (true/false)
* `minPrice`, `maxPrice`
* `bedrooms`
* `bathrooms`
* `minArea`, `maxArea`
* `minRating`
* `tags` (comma-separated list)
* `amenities` (comma-separated list)

Example:

```http
GET /api/properties?city=New York&minPrice=100000&maxPrice=500000&furnished=true
```

---

## Redis Caching

* Property GET requests use Redis caching for faster response times.
* Cache invalidates automatically when properties are created, updated, or deleted.

---

## Deployment

This project can be deployed on cloud platforms like Render, Heroku, or AWS.
Ensure environment variables are properly configured in your deployment settings.

---

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

---

## Contact

Your Name - Himanshu Dubey
GitHub: [https://github.com/himanshudubey7](https://github.com/himanshudubey7)

---

**Thank you for checking out the Property Listing Project!**

```

