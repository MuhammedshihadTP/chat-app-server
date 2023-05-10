import mongoose, { Model, Schema } from "mongoose";

interface User {
  user: Model<any>;
}

const users: User = {
  user: mongoose.model(
    "users",

    new Schema({
      name: {
        type: String,
      },
      
      email: {
        type: String,
      },
      password: {
        type: String,
      },
      image:{
        type:String,
      },
      isOnline:{
        type:Boolean,
        default:true
      }
    })
  ),
};

export default users;
