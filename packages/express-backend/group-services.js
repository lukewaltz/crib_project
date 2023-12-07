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

async function findGroup(groupId){
    return await groupModel.find({_id: groupId})
    .populate('members', 'name').
    exec()
    .catch((err) => {
        if(err){
            return undefined;
        }
    });
}
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

// async function getGroupSize(groupId) {
//     try {
//         groupModel.findOne({_id: groupId}).then((existingGroup) =>{
//             if (!existingGroup) {
//                 console.error("Group not found with code: ", code);
//                 return 404;
//             }    
//             const members = existingGroup.members;
//             return members.length;
//         });

//     } catch (error) {
//         console.error("Error finding size:", error);
//         return Promise.reject(500);
//     }
// }

export default {
    findGroup,
    findGroupByName,
    addGroup,
    addUserToGroup,
};
