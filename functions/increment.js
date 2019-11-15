import fetch from "node-fetch";

const API_ENDPOINT = "https://lp4asgadot.herokuapp.com/counters/";

exports.handler = async (event, context) => {
    const id = event.queryStringParameters.id;

    const route = API_ENDPOINT + id;

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