
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

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
        await client.connect();
        const database = client.db("isa");
        const collection = database.collection("file");
        const file = await collection.findOne({});
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
    } finally {
        await client.close();
    }
}
