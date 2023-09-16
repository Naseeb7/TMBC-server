import express from "express";
import {verifyToken} from "../Middleware/Auth.js"
import { getAllUsers } from "../Controllers/User.js";

const router = express.Router();

router.get("/:id/getallusers",verifyToken,getAllUsers);

export default router;