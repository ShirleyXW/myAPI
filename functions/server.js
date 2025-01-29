const greeting = require("../modules/get-date");
exports.handler = async (event, context) => {
    const { queryStringParameters } = event;
    const name = queryStringParameters.name || 'Anonymous';
    const message = greeting.getDate(name);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html', 
      },
      body: `<h1 style="color:blue">Hello ${message}</h1>`,
    };
  };