"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const users = {
    signUp: {
        user: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let { password, email } = req.body;
                const userExist = yield users_1.default.user.findOne({ email: email });
                if (userExist) {
                    res.status(400).json({ msg: "User already Exist" });
                }
                else {
                    bcrypt_1.default.hash(password, 10).then((hashedPassword) => {
                        req.body.password = hashedPassword;
                        const newUser = new users_1.default.user(req.body);
                        newUser.save();
                    });
                    res.status(200).json({ msg: "successfuly created" });
                }
            }
            catch (error) {
                console.log(error);
            }
        }),
    },
    login: {
        user: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }),
    },
};
exports.default = users;
