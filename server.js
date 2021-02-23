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
  response.setHeader('Content-Type', 'text/html');
  let blog_content = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));
  let entry = blog_content;
  let blogTitle = [];
  for(title in entry){
    blogTitle.push(title);
  }
  response.render("index", {
    data: blogTitle
  });
});

app.get('/about', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  let blog_content = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));
  let blogTitle = [];
  for(title in blog_content){
    blogTitle.push(title);
  }
  response.render("about",{
    data: blogTitle
  });
});

app.get('/blogCreate', function(request, response) {
    let blogs = JSON.parse(fs.readFileSync('data/content.json'));
    let arr = ["Damus","Mr. Gohde","Gooboy","Woash","Avatar","Aang","Katara"];
    let blogTitle = [];
    for(title in blogs){
      blogTitle.push(title);
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render("blog/blogCreate", {
      authors: arr,
      data: blogTitle
    });
});

app.get('/blog/:blogPost', function(request, response) {
  let blogs = JSON.parse(fs.readFileSync('data/content.json'));
  let arr = ["Damus","Mr. Gohde","Gooboy","Woash","Avatar","Aang","Katara"];
  let blogTitle = [];
  for(title in blogs){
    blogTitle.push(title);
  }
  let blogPost = request.params.blogPost;
  if(blogs[blogPost.split('_').join(' ')]){
    console.log("test");
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("blog_post",{
      data: blogs[blogPost.split('_').join(' ')],
      data2: blogTitle,
      authors: arr
    });
  } else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode": 404,
      data: blogTitle
    });
  }});

app.post('/blog', function(request, response) {
    let blogs = JSON.parse(fs.readFileSync('data/content.json'));
    let date = new Date().toLocaleString();
    var tags = request.body.tags.split(" ");
    var u = {
        user: request.body.author.trim(),
        title: request.body.title.trim(),
        date: date,
        tags: tags,
        content: request.body.content.trim(),
        descrip: request.body.descrip.trim()
    };
    blogs[request.body.title.trim()]=u;
    fs.writeFileSync('data/content.json', JSON.stringify(blogs));

    response.redirect("/");

});

app.post('/blog/comments/:blogPost', function(request, response) {
  let blogs = JSON.parse(fs.readFileSync('data/content.json'));
  let arr = [];
  let date = new Date().toLocaleString();
  console.log("test date + " + date);
  if(blogs[request.params.blogPost].comments)arr = blogs[request.params.blogPost].comments
    var u = {
        user: request.body.user2,
        content: request.body.content2,
        date: date
    };
    arr.push(u);
    blogs[request.params.blogPost].comments=arr;
    console.log("before write");
    fs.writeFileSync('data/content.json', JSON.stringify(blogs));
});

app.post('/blog/like/:blogPost', function(request, response) {
  let blogs = JSON.parse(fs.readFileSync('data/content.json'));
  let blogPost = request.params.blogPost;
  if(blogs[blogPost]){
    if (!blogs[blogPost].comments[request.body.c].likes) blogs[blogPost].comments[request.body.c].likes = 0;
    blogs[blogPost].comments[request.body.c].likes++;
    fs.writeFileSync('data/content.json', JSON.stringify(blogs));

    response.status(200);
    response.setHeader('Content-Type', 'text/json');
    response.send(blogs[blogPost]);
  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/json');
    response.send('{results: "no user"}');
  }
});

// Because routes/middleware are applied in order, this will act as a default error route in case of an invalid route
app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html');
  let blogs = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));
  let blogTitle = [];
  for(title in blogs){
    blogTitle.push(title);
  }
  response.render("error", {
    "errorCode":404,
    data: blogTitle
  });
});

//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Easy server listening for requests on port ' + port + '!');
  console.log('Visit http://localhost:'+port+' to see the website.')
});
