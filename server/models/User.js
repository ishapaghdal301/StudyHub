const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        lowercase: true,
    },
    last_name: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    cart : { type: Schema.Types.ObjectId, ref: 'Course' },
    githubId : {
        type: String,
    },
    linkedinId :{
        type: String
    },
    bio: {
        type: String,
    },
    website: {
        type: String,
    },
    profile_picture: {
        type: String, // You can store the image URL or use a file storage system
    }
    

}, { timestamps : { createdAt: 'created_at', updatedAt: 'updated_at' }}); //automatically add while insert or update the object

module.exports = User = mongoose.model('users', UserSchema)