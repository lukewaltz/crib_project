import mongoose from "mongoose";
import groupModel from "./group.js";

import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB in user-services"))
    .catch((error) => console.error("MongoDB Connection Error:", error));

async function findGroupByName(name) {
    return groupModel.findOne({ name: name }).then((group) => {
        return group;
    });
}

function addGroup(group) {
    const groupToAdd = new groupModel(group);
    const promise = groupToAdd.save().catch((e) => {
        if (e) {
            console.log(e);
            return 500;
        }
    });
    return promise;
}

async function addUserToGroup(code, user) {
    const promise = groupModel.findOneAndUpdate(
        { code: code },
        { $push: { members: user } },
        { new: true }
    );
    return promise;
}

export default {
    findGroupByName,
    addGroup,
    addUserToGroup,
};
