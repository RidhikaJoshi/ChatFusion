const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const dotenv = require("dotenv");
dotenv.config();
connectDB();

app.use(express.json()); // to accept json data

const { chats } = require("./Data/data");

app.get("/", (req, res) => {
	res.send("Hello Server");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
