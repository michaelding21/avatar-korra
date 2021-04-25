//blog server.js stuff goes here

let express = require('express');
let router = express.Router();
let request = require('request');
const fs = require('fs');


let Blog = require('../models/blog_model')

let apikey = 'f09c17eb';

router.get('/', function(req, res){
  let blogList = Blog.getAllBlogs();
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('index.ejs', {blog: blogList});
});

router.get('/blogs', function(req, res){
  let blogList = Blog.getAllBlogs();

  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('blog/show_blogs.ejs', {blog: blogList});
});

router.get('/about', function(req, res){
  let blogList = Blog.getAllBlogs();
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('about.ejs', {blog: blogList});
});

router.get('/blog/create', function(req, res){
/*
    let name=req.query.title;
    console.log(name);
    name=name.replace(/ /g, '+');
*/
//  request("http://www.omdbapi.com/?apikey="+apikey+"&t="+name+"&r=json", function(err, response, body) {
      if (0==0){
      //if(!err){
        //let blogResponse = JSON.parse(body);
        let blogList = Blog.getAllBlogs();
        let arr = ["Damus","Mr. Gohde","Gooboy","Woash","Avatar","Aang","Katara"];

        res.status(200);
        res.setHeader('Content-Type', 'text/html');
        res.render('blog/new_blog.ejs', {
          blog: blogList,
          authors: arr
        })
      }
      else{
        res.redirect('/blogs');
      }
//    });
});

router.post('/blogs', function(req, res){
  let id = req.params.id;
  //request("https://last-airbender-api.herokuapp.com/"+apikey+"&i="+id+"&r=json", function(err, response, body) {
    //        let blogResponse = JSON.parse(body);
    //        if(!err){
    let blogResponse = Blog.getAllBlogs();

              let newBlog={
                "id": req.body.id,
                "contributorID": req.body.contributorID,
                "name": req.body.author,
                "title": req.body.title,
                "description": req.body.description,
                "subtitle": req.body.subtitle,

                "text": req.body.text,
                "Date": req.body.Date,
              }
              let newID = (req.body.id);
              Blog.updateBlog(newID, newBlog);
              res.redirect('/blogs');
    //  }
    //  else{
    //      res.redirect('/blogs');
    //  }
  //});
});

router.get('/blog/:id', function(req,res){
  let thisBlog = Blog.getBlog(req.params.id);
  let blogList = Blog.getAllBlogs();

  if(thisBlog){
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("blog/blog_details.ejs", {blog: thisBlog} );
  }else{
    let errorCode=404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode":errorCode,
      blog: blogList

    });  }

});

router.get('/blog/:id/edit', function(req,res){
  let thisBlog = Blog.getBlog(req.params.id);
  thisBlog.id=req.params.id;
  let blogList = Blog.getAllBlogs();

  if(thisBlog){
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("blog/edit_blog.ejs", {blog: thisBlog} );
  }
  else{
    let errorCode=404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode":errorCode,
      blog: blogList

    });   }
});

router.put('/blog/:id', function(req,res){
  let newBlogData = {};
  let id= req.body.id;
  newBlogData["id"] = req.body.id;
  newBlogData["contributorID"] = req.body.contributorID;
  newBlogData["name"]= req.body.name;
  newBlogData["title"]= req.body.title;
  newBlogData["description"]= req.body.description;
  newBlogData["subtitle"]= req.body.subtitle;
  newBlogData["text"]= req.body.text;

  newBlogData["Date"]= req.body.Date;

  Blog.updateBlog(id, newBlogData);
  res.redirect('/blogs');
});

router.delete('/blog/:id', function(req, res){
  console.log(req.params.id);
  Blog.deleteBlog(req.params.id);
  res.redirect('/blogs');
});

router.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html');
  let blogs = JSON.parse(fs.readFileSync('data/blog.json', 'utf8'));
  let blogTitle = [];
  for(title in blogs){
    blogTitle.push(title);
  }
  response.render("error.ejs", {
    "errorCode":404,
    blog: blogs
  });
});

module.exports = router
