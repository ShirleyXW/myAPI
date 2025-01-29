exports.handler = async (event, context) => {
    const { queryStringParameters } = event;
    const name = queryStringParameters.name || 'Anonymous';
  
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Hello ${name}</h1>`);
  };