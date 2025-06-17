     // Force production mode
     process.env.NODE_ENV = 'production';

     const { createServer } = require('http');
     const next = require('next');

     const app = next({ dir: '.', dev: false });
     const handle = app.getRequestHandler();

     app.prepare().then(() => {
       createServer((req, res) => {
         handle(req, res);
       }).listen(3001, (err) => {
         if (err) throw err;
         console.log('> Ready on http://localhost:3001');
       });
     });
