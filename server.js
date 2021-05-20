/*jshint esversion: 6 */

let express = require('express');
let app = express();
let ejs = require('ejs');
let path = require('path');
let methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(require('./controllers/auth'));
app.use(require('./controllers/index'));
app.use(require('./controllers/user_controller'));
app.use(require('./controllers/blog_controller'));
app.use(require('./controllers/quiz_controller'));

//default error route in case ofan invalid route
app.use("", function(request, response) {
  response.status(404);
  response.setHeader('Content-Type', 'text/html');
  response.render("error", {
    "errorCode": "404"
  });
});

//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Easy server listening for requests on port ' + port + '!');
  console.log('Visit http://localhost:' + port + ' to see the website.');
});
