const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGODB_URI;

let client;

async function getClient() {
    if (!client) {
        // Create a MongoClient with custom timeouts
        client = new MongoClient(uri, {
            connectTimeoutMS: 5000,       // 5 seconds to connect to MongoDB
            serverSelectionTimeoutMS: 5000 // 5 seconds to select a server
        });
        await client.connect(); // Connect to MongoDB
    }
    return client;
}


exports.handler = async (event, context) => {
  try {
    const client = await getClient();
    const db = client.db('isa');
    const collection = db.collection('file');
    const fileId = new ObjectId('679aaabfa2388ac7451b807a'); 
    const document = await collection.findOne({_id: fileId});
    if (document) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
        body: document.text,
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'File content not found' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read file' }),
    };
  }
};