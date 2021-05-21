/*jshint esversion: 8 */

var admin = require("firebase-admin");
var db = admin.firestore();

var fs = require('fs');

exports.getAllQuizzes = async function() {
  let allQuizzes = {};
  try {
    let quizzes = await db.collection('quizzes').get();

    for (var quiz of quizzes.docs) {
      allQuizzes[quiz.id] = quiz.data();
    }

    return allQuizzes;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

exports.getQuiz = async function(id) {
    try {
      let allQuizzes = await exports.getAllQuizzes();

      if (allQuizzes[id]) {
        return allQuizzes[id];
      }
    } catch (err) {
      console.log(err);
    }
};

exports.saveQuiz = async function(id, newQuiz) {
  try {
    let allQuizzes = await exports.getAllQuizzes();
    allQuizzes[id] = newQuiz;
    for (var name in allQuizzes) {
      let quiz = allQuizzes[name];
      let oneQuiz = await db.collection('quizzes').doc(quiz.id);
      oneQuiz.set({
        id: quiz.id,
        author: quiz.author,
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions,
        answers: quiz.answers,
        Date: quiz.Date
      });
    }
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

exports.updateQuiz = async function(id, quizData) {
  await exports.saveQuiz(id, quizData);
};

exports.deleteQuiz = async function(id) {
  try{
    await db.collection('quizzes').doc(id).delete();
  }
  catch (err){
    console.log(err);
  }
};
