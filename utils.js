const videos = require("./videos"); 
const {google} = require("googleapis");
const apiKey = "AIzaSyDgirsYuZAkib_AijwHgrzl8fAj6NEwG-U";
const keyStore = {
    unused: [],
    used: [],
    current: "AIzaSyDgirsYuZAkib_AijwHgrzl8fAj6NEwG-U"
}

let youtube = google.youtube({
    version: 'v3',
    auth: keyStore.current,
  });

const saveData =async (response) => {
    console.log(response);
    response.items.forEach(async element => {
            try {
                await videos.create({
                videoId: element.id.videoId,
                title: element.snippet.title,
                description: element.snippet.description,
                thumbnail: element.snippet.thumbnails,
                publishTime: element.snippet.publishTime
            })
            console.log("Record Inserted");
        }
        catch(error){
            //console.log("Duplicate Record");
        }
    })
}

const fetchLatestVideos = async () => {
    const response = await youtube.search.list({
        part: 'id,snippet',
        q: 'How to make tea',
        "maxResults": 25,
        "order": "date",
        "publishedAfter": "2024-05-23T23:55:55Z"
    });
    const responseData = response.data;
    if(response.status === 200)
        saveData(responseData);
    if(response.status === 403)
        updateKeyStore();
}

const updateKeyStore = () => {
    keyStore.used.push(keyStore.current);
    if(keyStore.unused.length === 0)
        throw new Exception("All the API Keys are used.");
    keyStore.current = keyStore.unused.shift();
    youtube = google.youtube({
        version: 'v3',
        auth: keyStore.current,
    });
}

const refreshAPIKeyStore = () => {
    keyStore.used.forEach(element => {
         keyStore.unused.push(element);
    })
    keyStore.used = [];
}

const addNewKey = (newKey) => {
    keyStore.unused.push(newKey);
}

module.exports = {saveData, fetchLatestVideos, refreshAPIKeyStore, addNewKey};