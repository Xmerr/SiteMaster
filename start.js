process.env = {
    port: 80,
    site: "xmer.pw"
};

(() => {
    var os = require('os');
    if(os.hostname().indexOf('xmer') !== -1) {
        // Determine if it's my test server or not
        process.env.port = 8080;
        process.env.site = "website-xmer.c9users.io";
    }
})();

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
//    {
//        path: `playersarchive.pw`,
//        data: require('./archiveStage/server.js')
//    },
//];

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

if(length === 0)
    end();

else
    for(var i = length - 1; i >= 0; i--) {
        (index => subs[index].data(svr => {
            app.use(vhost(subs[index].path, svr.app));
            
            if(svr.io)
                svr.io(io);

            end();
        }))(i);
    }

