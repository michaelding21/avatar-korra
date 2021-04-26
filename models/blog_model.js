var admin = require("firebase-admin");
var db = admin.firestore();

var fs = require('fs');

exports.getAllBlogs = async function() {
  var blogData = fs.readFileSync('data/blog.json', 'utf8');
  return JSON.parse(blogData);
/*
  let allBlogs = {};

  try {
    let blogs = await db.collection('blogs').get();

    for (blog of blogs.docs) {
      console.log(blog.id);
      allBlogs[blog.id] = blog.data();
    };

    return allBlogs;
  } catch (err) {
    console.log('Error getting documents', err);
  }
*/
}

exports.getBlog = async function(id) {
  var blogData = await exports.getAllBlogs();

  if (blogData[id]) return blogData[id];

  return {};
}

exports.saveBlog = async function(id, newBlog) {
  var blogData = await exports.getAllBlogs();
  blogData[id] = newBlog;
  fs.writeFileSync('data/blog.json', JSON.stringify(blogData));
}

exports.updateBlog = async function(id, blogData) {
  await exports.saveBlog(id, blogData)
}

exports.deleteBlog = async function(id) {
  var blogData = await exports.getAllBlogs();
  delete blogData[id];
  fs.writeFileSync('data/blog.json', JSON.stringify(blogData));
}
