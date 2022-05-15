import { Schema, model, models } from "mongoose";

export default models.users || model('users', new Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    dateCreated: { type: Date, default: Date.now }
}));