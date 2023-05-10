import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import http from 'http'
import {Server, Socket}  from "socket.io";



import auth from "./routers/auth";
import user from './routers/user'

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

mongoose.connect(process.env.APP_URL as string);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to the mongoose");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/auth", auth);
app.use(user)

app.listen(PORT, () => console.log(`App listening on Port ${PORT}`));
