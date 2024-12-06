import "dotenv/config";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import https from "https";
import routes from "./routes/userRoutes.mjs";

mongoose.connect("mongodb://localhost/chat-app");

const app = express();
const serv = https.Server(app);
const PORT = process.env.PORT;

app.use("/", routes);

serv.listen(PORT, () => {
	console.log(`The Server is listning on PORT ${PORT}`);
});
