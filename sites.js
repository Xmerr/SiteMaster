var subs = [
   {
       subdomain: 'avatar',
       data: require('./AvatarCraft/server.js'),
       path: 'AvatarCraft'
   },
   {
       subdomain: 'df',
       data: require('./DF/server.js'),
       path: 'DF'
   },
   {
       subdomain: 'tasks',
       data: require('./TaskTracker/server.js'),
       path: 'TaskTracker'
   },
   {
       subdomain: 'www',
       data: require('./PortfolioSite/server.js'),
       path: 'PortfolioSite'
   }
];

module.exports = subs;