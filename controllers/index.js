const express = require('express'),
  router = express.Router();

router.get('/', function(request, response) {
  console.log("Logged in user info:");
  console.log(request.user); //Passport adds user to the Request object if loggedIn
  console.log("Logged in user request headers:");
  console.log(request.headers); //Encrypted session info is sent as a request header

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
    user: request.user
  });
});

router.get('/about', function(request, response) {
  console.log("Logged in user info:");
  console.log(request.user); //Passport adds user to the Request object if loggedIn
  console.log("Logged in user request headers:");
  console.log(request.headers); //Encrypted session info is sent as a request header

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("about", {
    user: request.user
  });
});

router.get('/login', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login", {
    user: request.user
  });
});

router.get('/error', function(request, response) {
  const errorCode = request.query.code;
  if (!errorCode) errorCode = 400;
  const errors = {
    '400': "Unknown Client Error",
    '401': "Invalid Login",
    '404': "Resource Not Found",
    '500': "Server problem"
  }
  const description = errors[errorCode];

  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    user: request.user,
    "errorCode": errorCode,
    "details": description
  });
});

module.exports = router
