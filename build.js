var sites = require('./sites');
var ex = require('child_process').exec;

for(var i = sites.length - 1; i >= 0; i--) {
    if(process.env.development == 1) 
        ex(`cd ./${sites[i].path} && npm start`, (error, stout) => {
            if(error)
                console.log(error);

            if(stout)
                console.log(stout);
        });

    else
        ex(`cd ./${sites[i].path} && npm run build`, (error, stout) => {
            if(error)
                console.log(error);

            if(stout)
                console.log(stout);
        });
}