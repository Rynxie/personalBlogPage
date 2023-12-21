const mongooose = require("mongoose")
const Schema = mongooose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },  
    thumbnail: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishDate: {
        type: String,
        required: true
    },
    draft: {
        type: Boolean,
        required: true
        }
})
const blog = mongooose.model("blog", blogSchema)
module.exports = blog