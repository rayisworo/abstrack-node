const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');
const {dbConfig} = require('../config/database.config');

const collectionName = dbConfig.user;

async function register(user){
    const database = await getDatabase();
    console.log("register");
    try{
        const {userId} = await database.collection(collectionName).insertOne(user);
        return userId;
    }catch (error) {
        console.log(error);
    }
}

async function login(creds){
    const database = await getDatabase();
    const {username,password} = creds;
    try {
        return await database.collection(collectionName).find({
            username:username,
            password:password
        }).toArray();
    } catch (error) {
        return error;
    }
}

module.exports = {
    register,
    login
}