/*jshint esversion: 8 */

var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase-config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
var fs = require('fs');

exports.getAllUsers = async function() {
  let allUsers = {};
  try {
    let users = await db.collection('users').get();
    for (var user of users.docs) {
      allUsers[user.id] = user.data();
    }
    return allUsers;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

exports.getUser = async function(id) {

  try {
    let allUsers = await exports.getAllUsers();

    if (allUsers[id]) {
      return allUsers[id];
    }
  } catch (err) {
    console.log(err);
  }};

exports.saveUser = async function(id, newUser) {

  try {
    let allUsers = await exports.getAllUsers();
    allUsers[id] = newUser;
    for (var name in allUsers) {
      let user = allUsers[name];
      let oneUser = await db.collection('users').doc(user.id);
      oneUser.set({
        id: user.id,
        name: user.name,
        logins: user.logins,
        bio: user.bio,
        Blogs: user.Blogs
      });
    }
  } catch (err) {
    console.log('Error getting documents', err);
  }

};
exports.updateUser = async function(id, userData) {
  await exports.saveUser(id, userData);
};

exports.deleteUser = async function(id) {
  try{
    await db.collection('users').doc(id).delete();
  }
  catch (err){
    console.log(err);
  }
};
