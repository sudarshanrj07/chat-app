import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import routes from "./routes/userRoutes.mjs";
import { Server } from "socket.io";
import { User } from "./models/userModule.mjs";
mongoose.connect("mongodb://localhost/chat-app");

const app = express();
const serv = http.Server(app);
const { PORT } = process.env;

app.use("/", routes);

const io = new Server(serv);

const userNameSpace = io.of("/user-namespace");

userNameSpace.on("connection", async (socket) => {
	console.log("user Conneceted");
	const userId = socket.handshake.auth.token;
	await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: "1" } });
	socket.on("disconnect", async () => {
		console.log("user disconnected");

		await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: "0" } });
	});
});

serv.listen(PORT, () => {
	console.log(`The Server is listning on PORT ${PORT}`);
});
