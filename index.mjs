import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import routes from "./routes/userRoutes.mjs";

mongoose.connect("mongodb://localhost/chat-app");

const app = express();
const serv = http.Server(app);
const { PORT } = process.env;

app.use("/", routes);

serv.listen(PORT, () => {
	console.log(`The Server is listning on PORT ${PORT}`);
});
