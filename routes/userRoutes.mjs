import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import {
	registerLoad,
	register,
	loadLogin,
	logout,
	login,
	loadDashboard,
} from "../controllers/userController.mjs";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { SESSION_SECERT } = process.env;
const router = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
	session({ secret: SESSION_SECERT, resave: false, saveUninitialized: false })
);
router.set("view engine", "ejs");
router.set("views", "./views");
router.use(express.static("public"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../public/images"));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage });

router.get("/register", registerLoad);
router.post("/register", upload.single("image"), register);
router.get("/", loadLogin);
router.post("/", login);
router.get("/logout", logout);
router.get("/dashboard", loadDashboard);

router.get("*", (req, res) => {
	res.redirect("/");
});
export default router;
