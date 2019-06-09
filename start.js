process.env = {
    port: 80,
    site: "xmer.pw"
};

var vhost = require('vhost'),
    express = require('express'),
    app = express(),
    os = require('os'),
    http = require('http').createServer(app),
    io = require('socket.io')(http);


if(os.hostname().indexOf('HILTON') != -1 || os.hostname().indexOf('DESKTOP-PMF') != -1)
    process.env.site = "localhost";

var subs = require('./sites.js');

// What site should be the "catch all"
const CATCH_ALL = require('./redirect.js');

var length = subs.length;

var end = () => {
    length--;

    if(length > 0)
        return;

    CATCH_ALL(svr => {
        app.use(svr.app);
        if(svr.io)
            svr.io(io);
    });

    http.listen(process.env.port, () => {
        console.log(`listening to ${process.env.port}`);
    });
};

// If there are no subs launch the app as is
if(length === 0)
    end();

// Prep submodules
else
    for(var i = length - 1; i >= 0; i--) {
        (index => subs[index].data(svr => {
            app.use(
                vhost(`${subs[index].subdomain}.${process.env.site}`, svr.app)
            );
            
            // Sets up the websocket server for each app
            if(svr.io)
                svr.io(io);

            end();
        }))(i);
    }

