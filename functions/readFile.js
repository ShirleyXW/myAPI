const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
  try {
    await client.connect();
    const db = client.db('isa');
    const collection = db.collection('file');

    const document = await collection.findOne({});
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
  } finally {
    await client.close();
  }
};