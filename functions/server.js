const greeting = require("../modules/get-date");
exports.handler = async (event, context) => {
    if (event.path !== '/.netlify/functions/server'){
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'text/plain', 
        },
        body: 'Bad Request',
    }
  }

  const { queryStringParameters } = event;
  if (!queryStringParameters && !queryStringParameters.name){
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/plain', 
      },
      body: 'Bad Request',
    }
  }

    const name = queryStringParameters.name || 'Anonymous';
    const message = greeting.getDate(name);


    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html', 
      },
      body: `<h1 style="color:blue">${message}</h1>`,
    };
  };