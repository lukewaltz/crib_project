import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        //add email validation
    },
    job: {
        type: String,
        trim: true,
        validate(value) {
        if (value.length < 2)
            throw new Error("Invalid job, must be at least 2 characters.");
        },
    },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;