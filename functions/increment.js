const fetch = require('node-fetch');

const API_ENDPOINT = "https://lp4asgadot.herokuapp.com/counters/";

exports.handler = async (event, context) => {
    const counterId = event.body.counterId;

    const route = API_ENDPOINT + counterId +'.json';

    return fetch(route, { 
        headers: { "Accept": "application/json" },
        method: "PATCH"
    })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data.joke
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};