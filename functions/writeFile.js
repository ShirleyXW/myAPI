
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.writeFile = async (event, context) => {
    const {queryStringParameters} = event;
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
        if (file) {
            await collection.updateOne(
                { _id: document._id },
                { $set: { text: document.text + '\n' + text } });
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
