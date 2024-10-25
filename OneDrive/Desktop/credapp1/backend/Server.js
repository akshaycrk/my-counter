const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const routes = require("./routes/TaskRoute");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("MongoDB connection error:", err));

// Use routes
app.use("/api", routes);

// Start the server
app.listen(PORT, () => console.log(`Listening at ${PORT}`));
