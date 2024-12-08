import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import routes from "./routes/userRoutes.mjs";
import { Server } from "socket.io";
import { User } from "./models/userModule.mjs";
import { Chat } from "./models/chatModule.mjs";
mongoose.connect("mongodb://localhost/chat-app");

const app = express();
const serv = http.Server(app);
const { PORT } = process.env;

app.use("/", routes);

const io = new Server(serv);

const userNameSpace = io.of("/user-namespace");

userNameSpace.on("connection", async (socket) => {
	const userId = socket.handshake.auth.token;
	await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: "1" } });
	socket.broadcast.emit("getOnlineUser", { user_id: userId });
	socket.on("disconnect", async () => {
		await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: "0" } });
		socket.broadcast.emit("getOfflineUser", { user_id: userId });
	});
	socket.on("newChat", (data) => {
		socket.broadcast.emit("loadNewChat", data);
	});
	socket.on("getChatHistory", async (data) => {
		const chatHistory = await Chat.find({
			$or: [
				{ sender_id: data.sender_id, receiver_id: data.receiver_id },
				{ sender_id: data.receiver_id, receiver_id: data.sender_id },
			],
		});

		socket.emit("postChatHistory", { chats: chatHistory });
	});
	socket.on("messageDeleted", (data) => {
		socket.broadcast.emit("messageDeletedSuccess", data);
	});
});

serv.listen(PORT, () => {
	console.log(`The Server is listning on PORT ${PORT}`);
});
