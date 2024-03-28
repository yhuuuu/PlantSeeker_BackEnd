//Importing the necessary modules for your Node.js application
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import favorites from './routes/favorites.mjs'
import cors from 'cors'
/** Configurations
 * Loads the .env file and makes the environment variables defined in it available to your Node.js application.
 
 * 1.Loads environment variables from a .env file into process.env.
 * 2.Creates an instance of Express.js application.
 * 3.Sets the port number for the server. It uses the value of the PORT environment variable if available, otherwise defaults to port 3000
*/

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Connects to MongoDB using the URI specified in the MONGO_URI environment variable
 */
// await mongoose.connect(process.env.MONGO_URI);
try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
} catch (err) {
    console.error("Error connecting to MongoDB:", err);
}

/** Middleware to parse JSON bodies in incoming requests
 * It enables Express.js to automatically parse JSON request bodies and make them available in req.body.
 * 1.Defines a route handler for the root URL (/). When a GET request is made to the root URL, it responds with 'Welcome'.
 */
app.use(express.json());
app.use(cors())

//Use route files
app.use(favorites)

app.get('/', async (req, res) => {
    res.send('Welcome')
})

/** Middleware to handle 404 errors
 * If a request reaches this point without being handled by any other route, it responds with 'Route not found' and sets the status code to 404.
 */
app.use((req, res, next) => {
    res.status(404).send('Route not found')
});

/** Middleware to handle errors
 * If an error occurs during the processing of a request, this middleware catches it and responds with a generic error message. The error object is available as err 
 * */
app.use((err, req, res, next) => {
    res.status(500).send('Seems like we messed up somewhere...');
});


/** Server Listening
 * Starts the Express.js server and listens on the specified port (PORT). Once the server starts listening, it logs a message to the console indicating the port number it's listening on
 */
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});