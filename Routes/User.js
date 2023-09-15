import express from "express";
import {verifyToken} from "../Middleware/Auth.js"
import { getUser } from "../Controllers/User.js";

const router = express.Router();

router.get("/:id",verifyToken,getUser);

export default router;