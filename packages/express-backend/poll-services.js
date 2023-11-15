import mongoose from "mongoose";
import pollModel from "./pollSchema.js";
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
    .catch((error) => console.log(error));

async function findPoll(id) {
    return pollModel.findById(id)
        .exec()
        .then((poll) => {
            if (!poll) {
                return null;
            }
            return poll;
        })
        .catch((error) => {
            console.error("error finding poll: ", error);
            throw error;
        });
}

function getPolls() {
    let promise = pollModel.find();
    return promise;
}

function addPoll(poll) {
    const pollToAdd = new pollModel(poll);
    const promise = pollToAdd.save().catch((e) => {
        if(e){
            return 500;
        }
    });
    return promise;
}

async function deletePoll(id){
    const promise = pollModel.findByIdAndRemove(id).catch((err) => {
        if(err){
            return undefined;
        }
    });
    return promise;
}



export default {
    findPoll,
    getPolls,
    addPoll,
    deletePoll,
};