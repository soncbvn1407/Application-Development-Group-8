const bcrypt = require("bcryptjs/dist/bcrypt");
const async = require("hbs/lib/async");
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URL =
  "mongodb+srv://thanhbinh2001:123456789abc@cluster0.spshl.mongodb.net/test";
const DATABASE_NAME = "Shop_Demo";


async function getdbo() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertObject(collectionName, objectToInsert) {
    const dbo = await getdbo();
    const newObject = await dbo
    .collection(collectionName)
    .insertOne(objectToInsert);
    console.log(
    "Gia tri id moi duoc insert la: ",
    newObject.insertedId.toHexString()
    );
}
  
async function checkUserLogin(nameIn) {
    const dbo = await getdbo();
    const results = await dbo.collection("Users").findOne({ userName: nameIn });
    if (results) {
    return results;
    } else {
    return -1;
    }
}
  
async function checkUserRole(nameIn) {
    const dbo = await getdbo();
    const user = await dbo.collection("Users").findOne({ userName: nameIn });
    if (user == null) {
    return -1;
    } else {
    return user.role;
    }
}
  
async function checkUser(nameIn) {
    const dbo = await getdbo();
    const results = await dbo.collection("Users").findOne({ userName: nameIn });
    if (results != null) {
    return true;
    } else {
    return false;
    }
}
  
async function getUser(name) {
    const dbo = await getdbo();
    const result = await dbo.collection("Users").findOne({ userName: name });
    return result;
}
async function searchObjectbyName(collectionName, name) {
    const dbo = await getdbo();
    const result = await dbo
        .collection(collectionName)
        .find({ name: { $regex: name, $options: "i" } })
        .toArray();
    return result;
}

async function searchObjectbyID(collectionName, id) {
    const dbo = await getdbo();
    const result = await dbo
        .collection(collectionName)
        .find({ id: { $regex: id, $options: "i" } })
        .toArray();
    return result;
}

async function searchObjectbyPrice(collectionName, price) {
    const dbo = await getdbo();
    const result = await dbo
        .collection(collectionName)
        .find({ price: price })
        .toArray();
    return result;
}

async function searchObjectbyCategory(collectionName, category) {
    const dbo = await getdbo();
    const result = await dbo
        .collection(collectionName)
        .find({ category: ObjectId(category) })
        .toArray();
    return result;
}

async function getAll(collectionName) {
    const dbo = await getdbo();
    const result = await dbo
        .collection(collectionName)
        .find({})
        .sort({ time: -1 })
        .toArray();
    return result;
}
async function searchHotBooks() {
    const dbo = await getdbo();
    const result = await dbo.collection("Book").find({ hot: "true" }).toArray();
    return result;
  }
  
module.exports = {
    insertObject,
    checkUserRole,
    checkUser,
    checkUserLogin,
    getUser,
    searchObjectbyCategory,
    searchObjectbyPrice,
    searchObjectbyID,
    searchObjectbyName,
    getAll,
    searchHotBooks,
    
};