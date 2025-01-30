const greeting = require("../modules/get-date");
exports.handler = async (event, context) => {
    if (!event.path.startsWith('/COMP4537/labs/3/greeting/')){
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'text/plain', 
        },
        body: 'Bad Request',
    }
  }

  const { queryStringParameters } = event;
  if (!queryStringParameters || !queryStringParameters.name){
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/plain', 
      },
      body: 'Bad Request',
    }
  }

    const name = queryStringParameters.name || 'Anonymous';
    const editName = name.charAt(0).toUpperCase() + name.slice(1);
    const message = greeting.getDate(editName);


    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html', 
      },
      body: `<h1 style="color:blue">${message}</h1>`,
    };
  };