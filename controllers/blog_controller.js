
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

router.get('/blogs', async function(req, res) {
  try {
    let blogList = await Blog.getAllBlogs();

    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('blog/show_blogs.ejs', {
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
  fetch('https://last-airbender-api.herokuapp.com/api/v1/characters/random').then((resp) => resp.json()).then(async function(data) {
    //send this data to a new ejs called randomCharacter or something, and then use the form to link to a new page with GET
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    console.log(data);
    res.render('random.ejs', {
      character: data
    });
  }).catch(function(error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode,
    });
  });

});

router.get('/avatars', async function(req, res) {
  fetch('https://last-airbender-api.herokuapp.com/api/v1/characters/avatar').then((resp) => resp.json()).then(async function(data) {
    //send this data to a new ejs called randomCharacter or something, and then use the form to link to a new page with GET
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    console.log(data[0]);
    res.render('avatars.ejs', {
      avatars: data
    });
  }).catch(function(error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode,
    });
  });

});

router.get('/blog/create', async function(req, res) {
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
      let blogList = await Blog.getAllBlogs();
      let arr = ["Damus", "Mr. Gohde", "Gooboy", "Woash", "Avatar", "Aang", "Katara"];

      res.status(200);
      res.setHeader('Content-Type', 'text/html');
      res.render('blog/new_blog.ejs', {
        blog: blogList,
        authors: arr
      })
    } else {
      res.redirect('/blogs');
    }

  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }

});

router.post('/blogs', async function(req, res) {
  try {
    let id = req.params.id;
    let blogResponse = await Blog.getAllBlogs();
    let newBlog = {
      "id": req.body.id,
      "name": req.body.name,
      "title": req.body.title,
      "description": req.body.description,
      "subtitle": req.body.subtitle,
      "text": req.body.text,
      "Date": req.body.Date
    }
    let newID = (req.body.id);
    await Blog.updateBlog(newID, newBlog);
    res.redirect('/blogs');
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode
    });
  }
});

router.get('/blog/:id', async function(req, res) {
  try {
    let thisBlog = await Blog.getBlog(req.params.id);
    let blogList = await Blog.getAllBlogs();
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("blog/blog_details.ejs", {
      blog: thisBlog
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

router.get('/blog/:id/edit', async function(req, res) {
  try {
    let thisBlog = await Blog.getBlog(req.params.id);
    console.log(thisBlog);
    thisBlog.id = req.params.id;
    let blogList = await Blog.getAllBlogs();

    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("blog/edit_blog.ejs", {
      blog: thisBlog
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

router.put('/blog/:id', async function(req, res) {
  try {
    let newBlogData = {};
    let id = req.body.id;
    newBlogData["id"] = req.body.id;
    newBlogData["name"] = req.body.name;
    newBlogData["title"] = req.body.title;
    newBlogData["description"] = req.body.description;
    newBlogData["subtitle"] = req.body.subtitle;
    newBlogData["text"] = req.body.text;
    newBlogData["Date"] = req.body.Date;

    await Blog.updateBlog(id, newBlogData);
    res.redirect('/blogs');
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.delete('/blog/:id', async function(req, res) {
  try {
    await Blog.deleteBlog(req.params.id);
    res.redirect('/blogs');
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
