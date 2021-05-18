/*jshint esversion: 6 */

let express = require('express');
let router = express.Router();
let request = require('request');
const fs = require('fs');
const fetch = require('node-fetch');

let User = require('../models/user_model')
let Blog = require('../models/blog_model')
let Quiz = require('../models/quiz_model')

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

router.get('/quizzes', async function(req, res) {
  try {
    let quizList = await Quiz.getAllQuizzes();

    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render('quiz/show_quizzes.ejs', {
      quiz: quizList
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

router.get('/quiz/create', async function(req, res) {
  try {
    if (0 == 0) {
      let quizList = await Quiz.getAllQuizzes();
      let arr = ["Damus", "Mr. Gohde", "Gooboy", "Woash", "Avatar", "Aang", "Katara"];

      res.status(200);
      res.setHeader('Content-Type', 'text/html');
      res.render('quiz/new_quiz.ejs', {
        quiz: quizList,
        authors: arr
      })
    } else {
      res.redirect('/quizzes');
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

router.post('/quizzes', async function(req, res) {
  try {
    let id = req.params.id;
    let quizResponse = await Quiz.getAllQuizzes();
    let newQuiz = {
      "id": req.body.id,
      "author": req.body.author,
      "title": req.body.title,
      "description": req.body.description,
      "questions": req.body.questions,
      "answers": req.body.answers,
      "Date": req.body.Date
    }
    let newID = (req.body.id);
    await Quiz.updateQuiz(newID, newQuiz);
    res.redirect('/quizzes');
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode
    });
  }
});

router.get('/quiz/:id', async function(req, res) {
  try {
    let thisQuiz = await Quiz.getQuiz(req.params.id);
    let quizList = await Quiz.getAllQuizzes();
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("quiz/quiz_details.ejs", {
      quiz: thisQuiz
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

router.get('/quiz/:id/edit', async function(req, res) {
  try {
    let thisQuiz = await Quiz.getQuiz(req.params.id);
    thisQuiz.id = req.params.id;
    let quizList = await Quiz.getAllQuizzes();

    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.render("blog/edit_quiz.ejs", {
      quiz: thisQuiz
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

router.put('/quiz/:id', async function(req, res) {
  try {
    let newQuizData = {};
    let id = req.body.id;
    newQuizData["id"] = req.body.id;
    newQuizData["author"] = req.body.author;
    newQuizData["title"] = req.body.title;
    newQuizData["description"] = req.body.description;
    newQuizData["questions"] = req.body.questions;
    newQuizData["answers"] = req.body.answers;
    newQuizData["Date"] = req.body.Date;

    await Quiz.updateQuiz(id, newQuizData);
    res.redirect('/quizzes');
  } catch (error) {
    let errorCode = 404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {
      "errorCode": errorCode

    });
  }
});

router.delete('/quiz/:id', async function(req, res) {
  try {
    await Quiz.deleteQuiz(req.params.id);
    res.redirect('/quizzes');
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
