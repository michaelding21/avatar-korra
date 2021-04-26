
let express = require('express');
let router = express.Router();
let request = require('request');
const fs = require('fs');
const fetch = require('node-fetch');

let User = require('../models/user_model')
let Blog = require('../models/blog_model')
let apikey = 'f09c17eb';

router.get('/', async function(req, res) {
  try {
    let blogList = await Blog.getAllBlogs();
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('index.ejs', {
      blog: blogList
    });
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.get('/users', async function(req, res) {
  try {
    let blogList = await Blog.getAllBlogs();
    let userList = await User.getAllUsers();

    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('user/show_users.ejs', {
      users: userList,
      blog: blogList
    });
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.get('/about', async function(req, res) {
  try {
    let blogList = await Blog.getAllBlogs();
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('about.ejs', {
      blog: blogList
    });
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode,

    });
  }
});

router.get('/random', async function(req, res) {
  fetch('https://last-airbender-api.herokuapp.com/api/v1/characters/random').then((resp) => resp.json()).then(function(data) {
    console.log(data)
    //send this data to a new ejs called randomCharacter or something, and then use the form to link to a new page with GET
  }).catch(function(error) {
    console.log(error);
  });
})

router.get('/user/create', async function(req, res) {
  try {

    /*
        let name=req.query.title;
        console.log(name);
        name=name.replace(/ /g, '+');
    */
    //  request("http://www.omdbapi.com/?apikey="+apikey+"&t="+name+"&r=json", function(err, response, body) {
    if (0 == 0) {
      //if(!err){
      //let blogResponse = JSON.parse(body);
      let arr = ["Damus", "Mr. Gohde", "Gooboy", "Woash", "Avatar", "Aang", "Katara"];

      res.status(200);
      res.setHeader('Content-Type', 'text/html');
      res.render('user/new_user.ejs', {
        authors: arr
      })
    } else {
      res.redirect('/users');
    }
    //    });
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.post('/users', async function(req, res) {
  try{
    let id = req.params.id;
    let blogResponse = await Blog.getAllBlogs();
    let newUser = {
      "id": req.body.id,
      "name": req.body.name,
      "logins": req.body.logins,
      "bio": req.body.bio,
      "Blogs": req.body.Blogs
    }
    let newID = req.body.id;
    await User.updateUser(newID, newUser);
    res.redirect('/users');
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.get('/user/:id', async function(req, res) {
  try {
    let thisUser = await User.getUser(req.params.id);
    console.log(thisUser);
    let blogList = await Blog.getAllBlogs();
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("user/user_details.ejs", {
      user: thisUser
    });

  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.get('/user/:id/edit', async function(req, res) {
  try {
    let thisUser = await User.getUser(req.params.id);
    console.log(thisUser);
    thisUser.id = req.params.id;
    let blogList = await Blog.getAllBlogs();

    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("user/edit_user.ejs", {
      user: thisUser
    });

  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.put('/user/:id', async function(req, res) {
  try {
    let newUserData = {};
    let id = req.body.id;
    newUserData["id"] = req.body.id;
    newUserData["name"] = req.body.name;
    newUserData["logins"] = req.body.logins;
    newUserData["bio"] = req.body.bio;
    newUserData["Blogs"] = req.body.Blogs;

    await User.updateUser(id, newUserData);
    res.redirect('/users');
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.delete('/user/:id', async function(req, res) {
  try {
    await User.deleteUser(req.params.id);
    res.redirect('/users');
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode,

    });
  }
});

module.exports = router
