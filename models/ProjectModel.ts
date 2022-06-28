import { Schema, model, models } from "mongoose";

export default models.projects || model('projects', new Schema({
    title: String,
    desc: String,
    createdBy: String,
    team: Array,
    status: { type: String, default: 'ongoing' },
    tasks: [{
        title: String,
        desc: String,
        team: Array,
        createdBy: String,
        status: { type: String, default: 'todo' },
        comments: [{
            content: String,
            createdBy: String,
            dateCreated: { type: Date, default: Date.now }
        }],
        dateCreated: { type: Date, default: Date.now }
    }],
    dateCreated: { type: Date, default: Date.now }
}));