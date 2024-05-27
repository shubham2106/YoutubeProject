const express = require("express");
const videos = require("./videos");
const {google} = require("googleapis");
const apiKey = "AIzaSyDgirsYuZAkib_AijwHgrzl8fAj6NEwG-U";
const {saveData, fetchLatestVideos, refreshAPIKeyStore, addNewKey} = require("./utils");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: "You have crossed daily limit of request from this IP"
});

app.use(limiter);

app.get("/get/:title/:desc",(req, res)=>{
    res.send("Hello");
})

app.get("/",(req, res)=>{
    res.send("Welcome to YT Project by Shubham");
})

app.get("/getAll/page=:pageNum",async (req,res) => {
    res.send(await videos.find({}).limit(10).skip(10*req.params.pageNum).sort({publishTime:-1}));
})

app.get("/search/:title/page=:pageNum",async (req,res) => {
    const {title} = req.params;
    res.send(await videos.find({$text:{$search: title}}).limit(10).skip(10*req.params.pageNum).sort({publishTime:-1}).exec());
})

app.post("/key", (req, res) => {
    addNewKey(req.body.key);
})

fetchLatestVideos();
// setInterval(async  () => {
//     console.log("Data Fetched");
//     try{ 
//         fetchLatestVideos();
//     }
//     catch(Error){
//         console.log(`Exception in fetching video, ${JSON.stringify(Error)}`)
//     }
//     console.log("After Fetch");
// }, 100000);

// setInterval(async  () => {
//     refreshAPIKeyStore();
// }, 24*60*60*1000)

app.listen(3000);
