const express = require("express");
const {google} = require("googleapis");
const apiKey = "AIzaSyDgirsYuZAkib_AijwHgrzl8fAj6NEwG-U";
const saveData = require("./utils");

const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
});

const app = express();

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

app.listen(3000);
