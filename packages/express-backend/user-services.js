import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));


function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
    promise = userModel.find();
    } else if (name && !job) {
    promise = findUserByName(name);
    } else if (job && !name) {
    promise = findUserByJob(job);
    }
    return promise;
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save().catch((e) =>{
        if(e){
            return 500;
        }
    });
    return promise;
}

function findUserByName(name) {
    return userModel.find({ name: name });
}

function findUserByUserName(username) {
    userModel.find({ username: username }).catch((err)=> {
        if(err) {
            return undefined;
        }
    });
}

function findUserByJob(job) {
    return userModel.find({ job: job });
}

export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findUserByUserName,
};