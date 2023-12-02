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
        .then(() => console.log("Connected to MongoDB in poll-services"))
        .catch((error) => console.error("MongoDB Connection Error:", error));

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

function getPolls(email) {
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

async function deletePoll(id) {
    try {
        const poll = await findPoll(id);
        
        if (!poll) {
            console.log(`Poll with ID ${id} not found`);
            return undefined;
        }

        const deletedPoll = await pollModel.deleteOne({ _id: id });;
        return deletedPoll;
    } catch (error) {
        console.log(`Error deleting poll with ID ${id}`, error);
        throw error;
    }
}

async function voteForOption(pollId, option) {
    try {
        const poll = await pollModel.findById(pollId);

        if (!poll) {
            return {
                success: false,
                message: 'Poll not found',
            };
        }

        // Increment the vote count for the selected option
        poll[`${option}Votes`] += 1;

        // Save the updated poll document
        await poll.save();

        return {
            success: true,
            message: `Vote for ${option} recorded successfully`,
        };
    } catch (error) {
        console.error(`Error recording vote: ${error.message}`);
        return {
            success: false,
            message: `Error recording vote: ${error.message}`,
        };
    }
}




export default {
    findPoll,
    getPolls,
    addPoll,
    deletePoll,
    voteForOption
};