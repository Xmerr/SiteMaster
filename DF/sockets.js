var request = require('request'),
    http = require('http');


const apiLoc = 'http://test:evalpass@dev.dragonflyathletics.com:1337/api/dfkey/events';
var events = null;

// TODO: Connect to the api server and stop reading from json files
// TODO: If the api server is down data should be fetched from stores
// TODO: If the api server is down requests to update should be set on a loop until the server is restored
module.exports = sock => {
    sock.on('connection', client => {
        client.on('init', () => {
            http.get(apiLoc, res => {
                var d = '';
                res.on('data', chunk => {
                    d += chunk;
                });

                res.on('end', () => {
                    if(!res.complete && events)
                        client.emit('initEvents', events);

                    else if(res.complete) {
                        d = JSON.parse(d);
                        client.emit('initEvents', d);
                        events = d;   
                    }
                });
            });
        });

        client.on('test', () => {
            request.get(`${apiloc}`, (err, res, body) => {
                client.emit('log', json.parse(body));
            });
        });

        client.on('details', (event, user) => {
            var test = me => {
                http.get(`${apiLoc}/${event}/status/${user}`, res => {
                    var d = '';
                    res.on('data', chunk => {
                        d += chunk;
                    });

                    res.on('end', () => {
                        try {
                            d = JSON.parse(d);

                            if(typeof(d.coming) === "boolean")
                                client.emit('attending', event, d.coming);

                            else
                                me(me);
                        }
                        catch(e) {
                            me(me);
                        }
                    });
                });
            }

            test(test);
        });

        client.on('rsvp', (event, name, status) => {
            var test = me => {
                request.put({
                    url: `${apiLoc}/${event}/status/${name}`,
                    json: true,
                    body: {
                        "coming": status
                    }
                }, (err, res, body) => {
                    //This means it failed;
                    if(body)
                        me(me);
                });
            }

            test(test);
        });
    });
}