var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase-config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
var fs = require('fs');

exports.getAllUsers = async function() {
  //var userData = fs.readFileSync('data/user.json', 'utf8');
  //return JSON.parse(userData);

  let allUsers = {};

  try {
    let users = await db.collection('users').get();

    for (user of users.docs) {
      allUsers[user.id] = user.data();
    };

    return allUsers;
  } catch (err) {
    console.log('Error getting documents', err);
  }

}

exports.getUser = async function(id) {
/*
  var userData = await exports.getAllUsers();
  if (userData[id]) return userData[id];
  return {};
  */

  try {
    let allUsers = await exports.getAllUsers();

    if (allUsers[id]) {
      console.log(id)
      return allUsers[id];
    }
  } catch (err) {
    console.log(err)
  }

}

exports.saveUser = async function(id, newUser) {

  //var userData = await exports.getAllUsers();
//  userData[id] = newUser;
  //fs.writeFileSync('data/user.json', JSON.stringify(userData));

  try {
    let allUsers = await exports.getAllUsers();
    allUsers[id] = newUser;
    for (name in allUsers) {
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

}

exports.updateUser = async function(id, userData) {
  await exports.saveUser(id, userData)
}

exports.deleteUser = async function(id) {
  try{
    await db.collection('users').doc(id).delete();
  }
  catch (err){
    console.log(err);
  }
}
