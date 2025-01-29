exports.handler = async (event, context) => {
    const { queryStringParameters } = event;
    const name = queryStringParameters.name || 'Anonymous';
  
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html', 
      },
      body: `<h1>Hello ${name}</h1>`,
    };
  };