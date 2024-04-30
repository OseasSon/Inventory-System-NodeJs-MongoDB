# Microservices using Node.JS and AJAX

## Description

This project is a web-based application designed to manage a product catalogue. Built with Node.js and Express.js, and integrating MongoDB for data storage, the application provides CRUD operations for product management. It also uses AJAX for asynchronous data fetching, improving the user experience by not requiring a page reload when new data is fetched from the server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

This project requires:

- Node.js version 14.17.0
- Express.js version 4.19.2
- MongoDB for the database
- Mongoose for object data modeling
- EJS for templating
- Multer for handling file uploads

## Installation

1. Clone the repo (or dowload as ZIP):
```bash
git clone https://github.com/OseasSon/Inventory-System-NodeJs-MongoDB.git
```

2. Install Node.js. If you're using a version manager like nvm, you can do:
```bash
nvm install 14.17.0
```

3. Install dependencies:
```bash
npm install
```

## Database Configuration

This project uses MongoDB for the database. The MongoDB connection string is set in the `app.js` file with the variable `dbURI`.

You need to replace this string with your own MongoDB URI. If you're using MongoDB Atlas, you can get this URI from the Connect dialog in your cluster dashboard.

Your MongoDB URI should look something like this:

```javascript
const dbURI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority";
```

Remember to replace <username>, <password>, and <dbname> with your actual MongoDB username, password, and database name respectively.


