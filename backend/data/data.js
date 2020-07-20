const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

let globalLock = false;
let globalTimestamp = "";

let timestampArticles = "";
let timestampArticlesLock = false;

let timestampTags = "";
let timestampTagsLock = false;

let timestampArticlesTags = "";
let timestampArticlesTagsLock = false;

let data = { articles:[], tags: [], articlesTags:[], webData:[] };
let dataLock = false;

const setTimestampArticles = async function() {
    if(timestampArticlesLock)
        while(timestampArticlesLock)
            await snooze(1000);
    timestampArticlesLock = true;
    timestampArticles = Date.now();
    timestampArticlesLock = false;
}

const setTimestampTags = async function() {
    if(timestampTagsLock)
        while(timestampTagsLock)
            await snooze(1000);
    timestampTagsLock = true;
    timestampTags = Date.now();
    timestampTagsLock = false;
}

const setTimestampArticlesTags = async function() {
    if(timestampArticlesTagsLock)
        while(timestampArticlesTagsLock)
            await snooze(1000);
    timestampArticlesTagsLock = true;
    timestampArticlesTags = Date.now();
    timestampArticlesTagsLock = false;
}

const setData = async function(newData, variable){
    if (dataLock)
        while(dataLock)
            await snooze(1000);
    dataLock = true;
    switch(variable){
        case 0:
            data.articles = newData;
            await setTimestampArticles();
            break;
        case 1:
            data.tags = newData;
            await setTimestampTags();
            break;
        case 2:
            data.articlesTags = newData;
            await setTimestampArticlesTags();
            break;
        case 3:
            await generateNewWebData();
            break;
    }
    dataLock = false;
}

async function generateNewWebData(){
    if(globalLock)
        while(globalLock)
            await snooze(1000);
    globalLock = true;
    for (let index = 0; index < data.articles.length; index++){
        data.webData[index] = data.articles[index];
        let tagsIDs = []
        for (let indexTagsID = 0; indexTagsID < data.articlesTags.length; indexTagsID++){
            if(data.articlesTags[indexTagsID].article === data.articles[index].article_id)
                tagsIDs.push(data.articlesTags[indexTagsID].tag)
        }
        let tagsName = []
        for(let indexTags = 0; indexTags < data.tags.length; indexTags++){
            for (let indexTagsID = 0; indexTagsID < tagsIDs.length; indexTagsID++){
                if(tagsIDs[indexTagsID] === data.tags[indexTags].tag_id) {
                    tagsName.push(data.tags[indexTags].tag_name)
                    break;
                }
            }
        }
        data.webData[index].tags = tagsName
    }
    globalTimestamp = Date.now()
    globalLock = false;
}

const getData = function(){
    return data.webData;
}

module.exports = {
    setData,
    getData
};
