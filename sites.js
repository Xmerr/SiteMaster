var subs = [
   {
       subdomain: 'avatar',
       data: require('./AvatarCraft/server.js'),
       path: 'AvatarCraft'
   },
   {
        subdomain: "willy",
        data: require('./WoolyWilly/server.js'),
        path: 'WoolyWilly'
   },
   {
       subdomain: 'www',
       data: require('./PortfolioSite/server.js'),
       path: 'PortfolioSite'
   }
];

module.exports = subs;