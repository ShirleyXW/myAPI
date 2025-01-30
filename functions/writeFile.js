
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

let client;

async function getClient() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client;
}


exports.handler = async (event, context) => {
    const { queryStringParameters } = event;
    if (!queryStringParameters || !queryStringParameters.text) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'text query parameter is required',
            }),
        };
    }
    const text = queryStringParameters.text;
    try {
        const client = await getClient();
        const database = client.db("isa");
        const collection = database.collection("file");
        const fileId = new ObjectId("679aaabfa2388ac7451b807a"); 
        const file = await collection.findOne({_id:fileId});
        console.log("before updated:",file);
        console.log("text:",text);
        if (file) {
            await collection.updateOne(
                { _id: file._id },
                { $set: { text: file.text + '\n' + text } });
            console.log("After updated:",file);
        } else {
            await collection.insertOne({ text });
        }
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'File updated',
            }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: e.message,
            }),
        };
    }
}
