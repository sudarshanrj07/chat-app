import { User } from "../models/userModule.mjs";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
	try {
		const hashPass = await bcrypt.hash(req.body.password, 10);
		const newUser = User({
			name: req.body.name,
			email: req.body.email,
			image: "images/" + req.file.filename,
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
