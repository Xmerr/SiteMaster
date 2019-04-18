var express = require('express'),
    app = express();

module.exports = cb => {
    app.get('/*', (req, res) => {
       res.redirect('http://www.xmer.pw');
    });

    cb({ app });
};
