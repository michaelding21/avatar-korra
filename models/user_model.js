var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase-config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
var fs = require('fs');

exports.getAllUsers = async function() {
  var userData = fs.readFileSync('data/user.json', 'utf8');
  return JSON.parse(userData);
}

exports.getUser = async function(id) {
  var userData = await exports.getAllUsers();

  if (userData[id]) return userData[id];

  return {};
}

exports.saveUser = function(id, newUser) {
  var userData = exports.getAllUsers();
  userData[id] = newUser;
  fs.writeFileSync('data/user.json', JSON.stringify(userData));
}

exports.updateUser = function(id, userData) {
  exports.saveUser(id, userData)
}

exports.deleteUser = function(id) {
  var userData = exports.getAllUsers();
  delete userData[id];
  fs.writeFileSync('data/user.json', JSON.stringify(userData));
}
