import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    name: String,
    age: Number
});

const AuthorModel = mongoose.model('Author', AuthorSchema);

export { AuthorModel }