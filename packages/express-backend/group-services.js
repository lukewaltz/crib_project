import mongoose from "mongoose";
import groupModel from "./groupSchema.js";

import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

mongoose
    .connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB in user-services"))
        .catch((error) => console.error("MongoDB Connection Error:", error));

async function findGroupByName(name) {
    return await groupModel.findOne({ name: username }).catch((err) => {
        if(err) {
            return undefined;
        }
    });
}

function addGroup(group) {
    const groupToAdd = new groupModel(group);
    const promise = groupToAdd.save().catch((e) =>{
        if(e){
            console.log(e);
            return 500;
        }
    });
    return promise;
}


async function addUserToGroup(code, userId) {
    try {
        const existingGroup = await groupModel.findOne({ code: code });

        if (!existingGroup) {
            console.error("Group not found with code:", code);
            return 404;
        }

        const updatedGroup = await groupModel.findOneAndUpdate(
            { code: code },
            { $push: { members: userId } },
            { new: true }
        );

        return updatedGroup;
    } catch (error) {
        console.error("Error adding user:", error);
        return Promise.reject(500);
    }
}

async function getGroupSize(code) {
    try {
        const existingGroup = await groupModel.findOne({ code: code });

        if (!existingGroup) {
            console.error("Group not found with code: ", code);
            return 404;
        }

        const members = existingGroup.members;
        return members.length();
    } catch (error) {
        console.error("Error finding size:", error);
        return Promise.reject(500);
    }
}

export default {
    findGroupByName,
    addGroup,
    addUserToGroup,
    getGroupSize,
};