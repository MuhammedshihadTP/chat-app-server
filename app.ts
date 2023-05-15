import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import userModel from "./models/users";

import auth from "./routers/auth";
import user from "./routers/user";

dotenv.config();
const app = express();

app.use(cors());

// moongoose connection
mongoose.connect(process.env.DB_URL as string);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to the mongoose");
});

const PORT = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
    // exposedHeaders: ["x-auth-token"]
  },
});

// app.set("io", io);
// socket connection

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);
  console.log(socket.handshake.query.userId);
  const userId: any = socket.handshake.query.userId;
  await userModel.user.findByIdAndUpdate(userId, { $set: { isOnline: true } });

  socket.on("disconnect", async () => {
    console.log("user disconnected:", socket.id);
    const userId: any = socket.handshake.query.userId;
    await userModel.user.findByIdAndUpdate(userId, {
      $set: { isOnline: false },
    });
  });
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", auth);
app.use(user);

server.listen(PORT, () => console.log(`App listening on Port ${PORT}`));

//  const io  = new Server(server);
//  io.on('connection', (socket: Socket) => {
//   console.log('New connection')
// })
