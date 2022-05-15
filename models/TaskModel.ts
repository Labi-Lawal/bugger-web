import { Schema, model, models } from "mongoose";

export default models.tasks || model('tasks', new Schema({
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