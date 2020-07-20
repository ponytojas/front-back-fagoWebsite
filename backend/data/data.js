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
            await generateNewWebData();
            break;
        case 1:
            data.tags = newData;
            await setTimestampTags();
            await generateNewWebData();
            break;
        case 2:
            data.articlesTags = newData;
            await setTimestampArticlesTags();
            await generateNewWebData();
            break;
    }
}

async function generateNewWebData(){
    if(globalLock)
        while(globalLock)
            await snooze(1000);
    globalLock = true;

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
