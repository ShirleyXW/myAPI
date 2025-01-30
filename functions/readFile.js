const MongoDB = require('../modules/mongodb');

exports.handler = async (event, context) => {
    const mongodb = new MongoDB();
  try {
    const document = await mongodb.findFile();
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