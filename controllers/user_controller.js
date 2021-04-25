//controller is moduralized server.js
//user server.js things

let express = require('express');
let router = express.Router();
let request = require('request');
const fs = require('fs');


let User = require('../models/user_model')
let Blog = require('../models/blog_model')
let blogList = Blog.getAllBlogs();
let apikey = 'f09c17eb';

router.get('/', function(req, res){
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('index.ejs', {blog: blogList});
});

router.get('/users', function(req, res){
  let userList = User.getAllUsers();

  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user/show_users.ejs', {
    users: userList,
    blog: blogList
  });
});

router.get('/user/create', function(req, res){
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
        res.render('user/new_user.ejs', {
          blog: blogList,
          authors: arr
        })
      }
      else{
        res.redirect('/users');
      }
//    });
});

router.post('/users', function(req, res){
  let id = req.params.id;
  //request("https://last-airbender-api.herokuapp.com/"+apikey+"&i="+id+"&r=json", function(err, response, body) {
    //        let blogResponse = JSON.parse(body);
    //        if(!err){
    let blogResponse = Blog.getAllBlogs();
              let newUser={
                "id": req.body.id,
                "name": req.body.name,
                "bio" : req.body.bio,

              }
              let newID = req.body.id;
              User.saveUser(newID, newUser);
              res.redirect('/users');
/*
      }
      else{
          res.redirect('/users');
      }
*/
    //});
});

router.get('/user/:id', function(req,res){
  let thisUser = User.getUser(req.params.id);

  if(thisUser){
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("user/user_details.ejs", {
      user: thisUser,
      blog: blogList
    } );
  }else{
    let errorCode=404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode":errorCode,
      blog: blogList

    });
  }

});

router.get('/user/:id/edit', function(req,res){
  let thisUser = User.getUser(req.params.id);
  thisUser.id=req.params.id;

  if(thisUser){
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("user/edit_user.ejs", {
      user: thisUser,
      blog: blogList
    } );
  }
  else{
    let errorCode=404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode":errorCode,
      blog: blogList
    });
  }
});

router.get('/api/v1/characters', function(req, res){
  console.log(res);
  let userList = User.getAllUsers();

  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user/show_characters.ejs', {
    users: userList,
    blog: blogList
  });
});

router.put('/user/:id', function(req,res){
  let newUserData = {};
  let id= req.body.id;
  newUserData["id"] = req.body.id;
  newUserData["name"]= req.body.name;
  newUserData["views"]= req.body.views;
  newUserData["logins"]= req.body.logins;
  newUserData["isContributor"] = req.body.isContributor;
  newUserData["Blogs"] = req.body.Blogs;

  User.updateUser(id, newUserData);
  res.redirect('/users');
});

router.delete('/user/:id', function(req, res){
  console.log(req.params.id);
  User.deleteUser(req.params.id);
  res.redirect('/users');
});

module.exports = router
