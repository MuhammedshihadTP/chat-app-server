"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routers/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
mongoose_1.default.connect(process.env.APP_URL);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("connected to the mongoose");
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(users_1.default);
app.listen(PORT, () => console.log(`App listening on Port ${PORT}`));
