import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import { registerLoad } from "../controllers/userController.mjs";
import { register } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
export default router;
