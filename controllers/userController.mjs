import { User } from "../models/userModule.mjs";
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
		res.render("dashboard", { user: req.session.user });
	} catch (error) {
		console.log(error.message);
	}
};
