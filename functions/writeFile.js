
const MongoDB = require('../modules/mongodb');


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
    const mongodb = new MongoDB();
    try {
        const file = await mongodb.findFile();
        await mongodb.updateFile(text);
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
