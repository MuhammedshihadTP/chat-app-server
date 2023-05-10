import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import usersModel from "../models/users";
interface Users {
  signUp: {
    user: (req: Request, res: Response, next: NextFunction) => void;
  };
  login: {
    user: (req: Request, res: Response, next: NextFunction) => void;
  };
  logout: {
    user: (req: Request, res: Response, next: NextFunction) => void;
  };
}

const users: Users = {
  signUp: {     
    user: async (req, res, next) => {
      try {
        let { password, email } = req.body;
        const userExist = await usersModel.user.findOne({ email: email });
        if (userExist) {
          res.status(400).json({ msg: "User already Exist" });
        } else {
          bcrypt.hash(password, 10).then((hashedPassword) => {
            req.body.password = hashedPassword;
            const newUser = new usersModel.user(req.body);
            newUser.save();
            res.status(201).json({ msg: "User Created" });
          });
          res.status(200).json({ msg: "successfuly created" });
          
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  login: {
    user: async (req, res, next) => {
      try {
        const key: any = process.env.SECRET_KEY;
        const { email, password } = req.body;
        const user = await usersModel.user.findOne({ email: email });
        if (!user) {
          res.status(404).json({ msg: "User Not founded" });
        } else {
          bcrypt.compare(password, user.password).then((isValid) => {
            if (isValid) {
              const token = jwt.sign({ userId: user._id }, key);
              // res.cookie("token", token, { httpOnly: true });    
              res.status(200).json({ msg: "user loged", token: token });
            } else {
              res.status(401).json({ msg: "Invalid password" });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  logout: {
    user: async (req, res) => {

      try {
        console.log("helo User");
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default users;
