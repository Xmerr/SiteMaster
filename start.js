process.env = {
    port: 80,
    site: "xmer.pw"
};

var vhost = require('vhost'),
    express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http);

var subs = [];
//    {
//        path: `menus.${process.env.site}`,
//        data: require('./Menus/server.js')
//    },
//];

// What site should be the "catch all"
const CATCH_ALL = require('./PortfolioSite/server.js');

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
                vhost(subs[index].path, svr.app)
            );
            
            // Sets up the websocket server for each app
            if(svr.io)
                svr.io(io);

            end();
        }))(i);
    }

