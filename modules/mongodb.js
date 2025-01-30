const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
class MongoDB {
    constructor() {
        this.client = null;
    }
    async getClient() {
        if (!this.client) {
            this.client = new MongoClient(uri, {
                connectTimeoutMS: 5000,
                serverSelectionTimeoutMS: 5000
            });
            await this.client.connect();
        }
        return this.client;
    }
    async getCollection() {
        const client = await this.getClient();
        const db = client.db('isa');
        return db.collection('file');
    }

    async findFile() {
        const collection = await this.getCollection();
        const fileId = new ObjectId('679aaabfa2388ac7451b807a');
        return await collection.findOne({ _id: fileId });
    }

    async updateFile(text) {
        const collection = await this.getCollection();
        const fileId = new ObjectId('679aaabfa2388ac7451b807a');
        const file = await collection.findOne({ _id: fileId });
        if (file) {
            await collection.updateOne(
                { _id: file._id },
                { $set: { text: file.text + '\n' + text } });
        } else {
            await collection.insertOne({ text });
        }
    }
}
module.exports = MongoDB;