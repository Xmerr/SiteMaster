var path = require('path'),
    fs = require('fs');

// TODO: Connect to the api server and stop reading from json files
// TODO: If the api server is down data should be fetched from stores
// TODO: If the api server is down requests to update should be set on a loop until the server is restored
module.exports = sock => {
    sock.on('connection', client => {
        client.on('init', () => {
            var data = fs.readFileSync(path.join(__dirname, './eventData.json'));
            client.emit('initEvents', JSON.parse(data));
        });
    });
}