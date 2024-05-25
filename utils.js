const videos = require("./videos"); 

const saveData =async (response) => {
    response.items.forEach(async element => {
        // const checkValue = await videos.exists({videoId : element.id.videoId});
        // if(checkValue === null){
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
        // }
        // else{
        //     return;
        // }
    })
}

module.exports = saveData;