"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controller/users"));
const router = (0, express_1.Router)();
// Signup Route
router.route('/signup')
    .post(users_1.default.signUp.user);
// Login Route
router.route('/login')
    .post(users_1.default.login.user);
exports.default = router;
