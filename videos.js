const { Db } = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin1:admin1@ytproject.qxakkqi.mongodb.net/?retryWrites=true&w=majority&appName=ytproject");

const schema = mongoose.Schema({
    videoId: String,
    title: String,
    description: String,
    thumbnail: Object,
    publishTime: Date
});
schema.index({videoId: 1}, {unique:true})
schema.index({title: "text", description: "text", publishTime: -1});
const videos =  mongoose.model("videos",schema);
module.exports = videos;