import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const SECRET_KEY: any = process.env.SECRET_KEY;
  // const token= req.headers.cookie?.split(";")[1];
  const authHeader: any = req.headers['authorization'];
  const token:any = authHeader&&authHeader.split(' ')[1] 
  const verified:any = token && SECRET_KEY ? jwt.verify(token, SECRET_KEY) : null;
  if (!verified) {
    return res.status(401).json({ msg: "Token not provided", Key: SECRET_KEY });
  }
// next()
  try {
    // const decodedToken: any = jwt.verify(token, SECRET_KEY);
    // console.log(decodedToken);
    req.body.userId = verified.userId;
    console.log(req.body.userId);
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

export default verifyToken;
