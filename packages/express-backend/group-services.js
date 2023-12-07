import mongoose from "mongoose";
import groupModel from "./groupSchema.js";

import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB in user-services"));
//.catch((error) => console.error("MongoDB Connection Error:", error));

async function findGroupByName(name) {
    return groupModel.findOne({ name: name }).then((group) => {
        return group;
    });
}

function addGroup(group) {
    const groupToAdd = new groupModel(group);
    const promise = groupToAdd.save().catch((e) => {
        return 500;
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

async function getGroupSize(group) {
    if (!group._id) {
        return 404;
    }
    return groupModel.findById(group._id).then((group) => {
        return group.members.length;
    });
}

export default {
    findGroupByName,
    addGroup,
    addUserToGroup,
    getGroupSize,
};
