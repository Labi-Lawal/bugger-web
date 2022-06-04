import { Schema, model, models } from "mongoose";

export default models.users || model('users', new Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    projects: {
        created: Array,
        assigned: Array,
        recent: { type: String, default: '' }
    },
    dateCreated: { type: Date, default: Date.now }
}));