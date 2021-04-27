/*jshint esversion: 6 */

let fs = require('fs');
let admin = require("firebase-admin");
let serviceAccount = require("../config/firebase-config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

let users = JSON.parse(fs.readFileSync('./data/user.json'));
let blogs = JSON.parse(fs.readFileSync('./data/blog.json'));

for (var name in users) {
  let user = users[name];
  let oneUser = db.collection('users').doc(user.id);
  oneUser.set({
    id: user.id,
    name: user.name,
    logins: user.logins,
    bio: user.bio,
    Blogs: user.Blogs
  });
}

for (var name in blogs) {
  let blog = blogs[name];
  let oneBlog = db.collection('blogs').doc(blog.id);
  oneBlog.set({
    id: blog.id,
    name: blog.name,
    title: blog.title,
    description: blog.description,
    subtitle: blog.subtitle,
    text: blog.text,
    Date: blog.Date
  });
}
