import mongoose from "mongoose";

export default mongoose.model('task', new mongoose.Schema({
    title: String,
    desc: String,
    team: Array,
    createdBy: String,
    comments: [{
        content: String,
        createdBy: String,
        dateCreated: { type: Date, default: Date.now }
    }],
    dateCreated: { type: Date, default: Date.now }
}));