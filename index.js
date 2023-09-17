import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http"
import { Server } from "socket.io"
import authRoutes from "./Routes/Auth.js"
import userRoutes from "./Routes/User.js";
import messageRoutes from "./Routes/Message.js";

dotenv.config()

const MongoURL=process.env.Mongo_URL
const PORT=process.env.PORT
const BaseURL=process.env.Base_URL

const app=express()


app.use(cors())
app.use(bodyParser.json())
const server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`Server live at port : ${PORT}`)
    mongoose.connect(MongoURL).then(() => {
        console.log(`Connected to DB`)
    }).catch((error) => console.log(`${error} did not connect`));
})


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/message", messageRoutes);

const io = new Server(server, {
    cors: {
        origin: "*",
        // origin: "http://localhost:3000",
    }
});


global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        socket.broadcast.emit("online-users", [...onlineUsers.keys()]);
        console.log([...onlineUsers.keys()])
    });
    socket.on("send-message", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("message-receive", { message : data.message, from : data.from })
        }
    });
    socket.on("typing", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("typing-data", { typing : data.typing , from : data.from })
        }
    });
    socket.on("disconnect", () => {
        onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                onlineUsers.delete(key)
            }
        })
        setTimeout(() => {
            socket.broadcast.emit("online-users", [...onlineUsers.keys()])
        }, 3000);
    });
})