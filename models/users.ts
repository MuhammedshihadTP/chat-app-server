import mongoose, { Model, Schema } from "mongoose";

interface User {
  findByIdAndUpdate(): unknown;
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
      image: {
        type: String,
      },
      isOnline: {
        type: Boolean,
        default: false
      }
    })
  ),
  findByIdAndUpdate: function (): unknown {
    throw new Error("Function not implemented.");
  }
};

export default users;
