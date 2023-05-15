import { Express, Request, Response, NextFunction } from "express";
import users from "../models/users";
import { Socket,Server } from "socket.io";
interface UserService {
  home: {
    user: (
      req: Request,
      res: Response,
      next: NextFunction,
      
    ) => void;
  };
}

const userService: UserService = {
  home: {
    user: async (req, res, next) => {
      console.log("helo");
      const getusers = await users.user.find();
    
      res.json(getusers);
    },
  },  
};

export default userService;
