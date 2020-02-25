
const https = require('https');
const parameters = [{
    "topic": "bec-use-grid-topic",
    "id": "1111",
    "eventType": "maintenanceRequested",
    "subject": "myapp/vehicles/diggers",
    "eventTime": "2018-10-30T21:03:07+00:00",
    "data": {
        "make": "test",
        "model": "Small",
        "test": "132"
    }
}];
const post_data = JSON.stringify(parameters);
const options = {
    hostname: "bec-use-dep-ers-neaim-grid-domain.eastus-1.eventgrid.azure.net",
    // hostname: 'bech-use-ers-nurehman-egd.centralus-1.eventgrid.azure.net',
    port: 443,
    path: "/api/events",
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'aeg-sas-key': 'qn+o6Hv7cR5Nt3bun0M2JsdqGD46pdmV8IEunl7uTNA='
        // 'aeg-sas-key': 'HYBtjGJqS/xc5EiYjLymW4GkqPNjE1J0XuStSqrV758='
    },
    agent: true
}
options.agent = new https.Agent(options);
const request = https.request(options, (response) => {
    let chunks_of_data = [];
    console.log("response: " + JSON.stringify(response.statusCode));
    response.setEncoding('utf8');
    response.on('data', (fragments) => {
        console.log('data', fragments);
    });
    response.on('end', () => {
        console.log('end');        
    });
    response.on('error', (error) => {
        console.log('+++++', error);
    });
});
request.on('error', (error) => {
    console.log('Error Code: ' + error.code);
    console.log('Error Message: ' + error.message);
});
request.write(post_data);
request.end(); 
 
