const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

const collectionName = 'ads';

async function insertAd(ad){
    const database = await getDatabase();
    try {
        const {insertedId} = await database.collection(collectionName).insertOne(ad);
        return insertedId;
    } catch (error) {
        console.log(error);
    }
}

async function getAds(){
    const database = await getDatabase();
    try {
        return await database.collection(collectionName).find().toArray();
    } catch (error) {
        console.log(error);
    }
}

async function deleteAd(id){
    const database = await getDatabase();
    console.log(id);
    try {
        await database.collection(collectionName).deleteOne({
            _id: new ObjectId(id),
        });
    } catch (error) {
        console.log(error);
    }
}

async function updateAd(id, ad){
    const database = await getDatabase();
    delete ad._id;
    try {
        database.collection(collectionName).update(
            {_id: new ObjectId(id)},
            {
                $set:{
                    ...ad
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertAd,
    getAds,
    deleteAd,
    updateAd
};