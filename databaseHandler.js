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

async function getAllFeedback() {
    const result = await getAll("Feedback");
    result.forEach(
        (e) => (e.timeString = new Date(e.time).toLocaleString("vi-VN"))
    );
    return result;
}

module.exports = {
    insertObject,
    checkUserRole,
    checkUser,
    checkUserLogin,
    getUser,
    getAllFeedback,
};