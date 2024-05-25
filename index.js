const express = require("express");
const videos = require("./videos");
const {google} = require("googleapis");
const apiKey = "AIzaSyDgirsYuZAkib_AijwHgrzl8fAj6NEwG-U";
const saveData = require("./utils");

const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
  });

const app = express();

app.get("/get/:title/:desc",(req, res)=>{
    res.send("Hello");
})

app.get("/getAll",async (req,res) => {
    res.send(await videos.find({}).sort({publishTime:-1}));
})

app.get("/search/:title",async (req,res) => {
    const {title} = req.params;
    res.send(await videos.find({$text:{$search: title}}).sort({publishTime:-1}).exec());
})

app.get("/search", async (req, res) => {    // To get the data from yt api and store it in mongo.
    const response = await youtube.search.list({
        part: 'id,snippet',
        q: 'How to make tea',
        "maxResults": 25,
        "order": "date",
        "publishedAfter": "2024-05-23T23:55:55Z"
    });
    const responseData = response.data;
    saveData(responseData);
    res.send(response.data);
  });

setInterval(async  () => {
    console.log("Data Fetched");
    await fetch(`http://localhost:3000/search`);
    console.log("After Fetch");
}, 10000);

app.listen(3000);