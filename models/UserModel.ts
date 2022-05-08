import mongoose from "mongoose";

export default mongoose.model('user', new mongoose.Schema({
    email: String,
    password: String,
    dateCreated: { type: Date, default: Date.now }
}));