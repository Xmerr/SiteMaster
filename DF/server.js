var path = require('path'),
    express = require('express'),
    app = express(),
    io = require('./sockets');

module.exports = cb => {
    // Public directory
    app.use('/public', express.static(path.join(__dirname, '.public'),{
        index: false,
        extensions: ['js', 'html']
    }));

    // Catchall
    app.get('/*', (req, res) => {
       res.sendFile(path.join(__dirname + '/index.html'));
    });

    // I made it a little unique in order to host multiple subdomains
    // The code that actually creates the server can be located at: ../start.js
    cb({ app, io });
};