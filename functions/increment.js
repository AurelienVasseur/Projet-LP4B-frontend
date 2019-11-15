const fetch = require('node-fetch');


exports.handler = async (event, context) => {
    const counterId = event.body.counterId;
    const route = "https://lp4asgadot.herokuapp.com/counters/" + counterId +'.json';

    return fetch(route, { 
        headers: { "Accept": "application/json" },
        method: "PATCH"
    })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};


/*exports.handler = async (event, context) => {
    //console.log(JSON.stringify(event),JSON.stringify(context) )
    console.log("Params : " + event.body);

    // Default options are marked with *
  await fetch('https://lp4asgadot.herokuapp.com/counters/'+event.body.counterId+'.json', {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
    return {
        statusCode: 201,
        body: "Updated"
    };
};*/