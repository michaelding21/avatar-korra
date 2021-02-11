//..............Include Express..................................//
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

//..............Create an Express server object..................//
const app = express();

//..............Apply Express middleware to the server object....//
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded());
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//.............Define server routes..............................//
//Express checks routes in the order in which they are defined

app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index");
});

app.get('/about', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let names = [];
  for(username in users){
    names.push(users[username].name);
  }
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("about",{
    names: names
  });
});

app.get('/scores', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let sortedUsers = [];
  for(username in users){
    let user = users[username];
    user.username= username;
    user.win_percent = (user.wins/parseFloat(user.wins+user.losses) * 100).toFixed(2);
    if(user.win_percent=="NaN")user.win_percent=0;
    sortedUsers.push(user);
  }
  sortedUsers.sort(function(a, b){
    return parseFloat(b.win_percent)-parseFloat(a.win_percent);
  })

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("scores",{
    users: sortedUsers
  });
});

app.get('/user/:username', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let username = request.params.username;

  if(users[username]){
    let user = users[username];
    user.username= username;
    user.win_percent = (user.wins/parseFloat(user.wins+user.losses) * 100).toFixed(2);
    if(user.win_percent=="NaN")user.win_percent=0;

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("user/userDetails",{
      user: user
    });

  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
});

app.get('/userCreate', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("user/userCreate");
});

app.get('/user', function(request, response) {
    let name = request.query.name;
    let email ="";

    let users = JSON.parse(fs.readFileSync('data/users.json'));
    for(username in users){
      let user = users[username];
      if(name==user.name){
        email=username;
        break;
      }
    }
    if(email){
      response.redirect("/user/"+email);
    }else{
      response.status(404);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        "errorCode":"404"
      });
    }
});

app.post('/user', function(request, response) {
    let users = JSON.parse(fs.readFileSync('data/users.json'));

    var u = {
        name: request.body.name.trim(),
        photo: request.body.photo_link.trim(),
        wins: 0,
        losses: 0
    };

    users[request.body.email.trim()]=u;
    fs.writeFileSync('data/users.json', JSON.stringify(users));

    response.redirect("/");

});

app.post('/user/wink/:username', function(request, response) {
  let users = JSON.parse(fs.readFileSync('data/users.json'));
  let username = request.params.username;

  if(users[username]){
    if (!users[username].winks) users[username].winks = 0;
    users[username].winks++;
    fs.writeFileSync('data/users.json', JSON.stringify(users));

    response.status(200);
    response.setHeader('Content-Type', 'text/json');
    response.send(users[username]);
  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/json');
    response.send('{results: "no user"}');
  }

});

// Because routes/middleware are applied in order, this will act as a default error route in case of an invalid route
app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404"
  });
});

//..............Start the server...............................//
const port = process.env.PORT || 3000; // heroku uses process.env.PORT to give your site a port, the 3000 is our backup option locally
app.listen(port, function() {
  console.log('Easy server listening for requests on port ' + port + '!');
  console.log('Visit http://localhost:'+port+' to see the website.')
});
