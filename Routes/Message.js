import express from "express";
import {
    addMessage,
    getAllMessages
} from "../Controllers/Message.js";
import {verifyToken} from "../Middleware/Auth.js"

const router=express.Router();

// READ
router.post("/:id/addmessage",verifyToken,addMessage);
router.post("/:id/getallmessages",verifyToken,getAllMessages);

export default router;