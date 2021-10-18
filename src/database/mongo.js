const {MongoClient} = require('mongodb');
const {dbConfig} = require('../config/database.config');
let database = null;

async function startDatabase(){
    const mongoDBURL = dbConfig.mongoBaseURL+dbConfig.database;
    try {
        const connection = await MongoClient.connect(mongoDBURL, {
            useNewUrlParser: true
        });
        database = connection.db();
    } catch (error) {
        console.log(error);
    }
}

async function getDatabase(){
    if(!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase
};