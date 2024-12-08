import { User } from "../models/userModule.mjs";
import { Chat } from "../models/chatModule.mjs";

import bcrypt from "bcrypt";
export const register = async (req, res) => {
	try {
		const {
			body: { name, email, password },
			file: { filename },
		} = req;

		const hashPass = await bcrypt.hash(password, 10);
		const newUser = User({
			name: name,
			email: email,
			image: "images/" + filename,
			password: hashPass,
		});
		await newUser.save();
		res.render("register", { message: "User registration succesful " });
	} catch (error) {
		console.log(error.message);
	}
};

export const registerLoad = async (req, res) => {
	try {
		res.render("register");
	} catch (error) {
		console.log(error.message);
	}
};

export const loadLogin = async (req, res) => {
	try {
		res.render("login");
	} catch (error) {
		console.log(error.message);
	}
};

export const login = async (req, res) => {
	try {
		const {
			body: { email, password },
		} = req;
		const user = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			req.session.user = user;
			return res.redirect("/dashboard");
		}
		res.render("login", { message: "Invalid credentials" });
	} catch (error) {
		console.log(error.message);
	}
};

export const logout = async (req, res) => {
	try {
		req.session.destroy();
		res.redirect("/");
	} catch (error) {
		console.log(error.message);
	}
};

export const loadDashboard = async (req, res) => {
	try {
		const users = await User.find({ _id: { $nin: [req.session.user._id] } });

		res.render("dashboard", { user: req.session.user, users: users });
	} catch (error) {
		console.log(error.message);
	}
};

export const saveChat = async (req, res) => {
	try {
		const {
			body: { sender_id, receiver_id, message },
		} = req;
		const chat = new Chat({
			sender_id: sender_id,
			receiver_id: receiver_id,
			message: message,
		});
		const newChat = await chat.save();
		if (!newChat) res.status(400).send({ success: false, msg: error.message });
		res.status(200).send({ success: true, msg: "Chat saved", data: newChat });
	} catch (error) {
		res.status(400).send({ success: false, msg: error.message });
	}
};

export const deleteMessage = async (req, res) => {
	try {
		await Chat.deleteOne({ _id: req.body.id });
		res.status(200).send({ success: true });
	} catch (error) {
		res.status(400).send({ success: false, msg: error.message });
	}
};

export const editMessage = async (req, res) => {
	try {
		const { id, editedMessage } = req.body;
		await Chat.findByIdAndUpdate(
			{ _id: id },
			{
				$set: {
					message: editedMessage,
				},
			}
		);
		res.status(200).send({ success: true });
	} catch (error) {
		res.status(400).send({ success: false, msg: error.message });
	}
};
