require('dotenv').config();
const express = require('express'); 
const app = express();
const path = require('path');
const cors = require('cors'); // Cross-Origin Resource Sharing
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose'); // MongoDB object modeling tool with purpose of managing relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);


// Handle options credentials check - before CORS!
app.use(credentials);

// Cross-Origin Resource Sharing
app.use(cors(corsOptions)); // allows cross-origin access

// Built-in middleware to handle URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for JSON
app.use(express.json());

// Middleware for cookies
app.use(cookieParser()); // this will parse cookies from the request headers

// Serve static files (default path is /public)
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// this  works as a way to protect routes / it work as a waterflow
app.use(verifyJWT); // Verify JWT token before accessing the following routes

app.use('/employees', require('./routes/api/employees'));
// 404 handler (catch-all)
app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 5:38