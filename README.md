# Lost and Found Platform

A web application designed to help people find their lost items or return items they have found. Built with Node.js, Express, MongoDB, EJS, and Tailwind CSS.

## Features

- *User Authentication:* Secure signup and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- *Post Lost/Found Items:* Users can create posts for items they have lost or found, including image uploads (handled via Multer).
- *Categorization:* Items are organized into categories for easier browsing.
- *Claim Items:* Users can submit claims for items they believe belong to them.
- *Dashboard:* Users can view and manage their own posts ("My Posts").
- *Admin Panel:* Administrative features to manage posts, users, categories, and claims.
- *Search and Filtering:* Allows users to search for items by title or description and filter them by category.
- *Automated Matching:* A cron job periodically checks for potential matches between lost and found items using string similarity.
- *Email Notifications:* Automatically sends email alerts with match details (including images and contact info) when a potential match is found.
- *Responsive Design:* Styled with Tailwind CSS to ensure a great experience on both desktop and mobile devices.

## Tech Stack

- *Backend:* Node.js, Express.js
- *Database:* MongoDB (via Mongoose)
- *Templating Engine:* EJS (Embedded JavaScript)
- *Styling:* Tailwind CSS (built with PostCSS)
- *Authentication:* JWT, cookie-parser, bcryptjs
- *File Uploads:* Multer
- *Cron Jobs:* node-cron
- *Emailing:* nodemailer
- *Matching Logic:* string-similarity

## Prerequisites

Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas URI)

## Getting Started

1. *Clone the repository:*
   bash
   git clone https://github.com/giftonj/lost-found.git
   cd lost-found
   

2. *Install dependencies:*
   bash
   npm install
   

3. *Set up environment variables:*
   Create a .env file in the root directory and add the following variables:
   env
   DATABASE_URL=mongodb://localhost:27017/lost-and-found # Or your MongoDB Atlas URI
   ACCESS_TOKEN=your_super_secret_jwt_key
   SECRET_KEY=your-secret-key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password_or_app_password
   IMAGE_URL=http://localhost:3000
   

4. *Run the development server:*
   The project uses concurrently to run both the Tailwind CSS watcher and the nodemon server simultaneously.
   bash
   npm run dev
   

5. *Access the application:*
   Open your browser and navigate to http://localhost:3000.

## Scripts

- npm run dev: Starts the development server with Nodemon and watches for Tailwind CSS changes.
- npm run build:css: Builds the production-ready CSS file.
- npm start: Starts the production server.

## Project Structure

- server.js: The entry point of the application.
- models/: Mongoose schemas (User, Post, Category, Claim).
- controllers/: Logic for handling requests.
- routers/: Express route definitions (auth, post, admin, etc.).
- views/: EJS templates for the frontend.
- public/: Static assets including generated CSS and uploaded images.
- middleware/: Custom middleware (e.g., JWT verification).
- crons/: Cron jobs for automated tasks (e.g., finding matches and sending emails).
