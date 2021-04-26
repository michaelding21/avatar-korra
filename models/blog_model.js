var admin = require("firebase-admin");
var db = admin.firestore();

var fs = require('fs');

exports.getAllBlogs = async function() {
  let allBlogs = {};
  try {
    let blogs = await db.collection('blogs').get();

    for (blog of blogs.docs) {
      allBlogs[blog.id] = blog.data();
    };

    return allBlogs;
  } catch (err) {
    console.log('Error getting documents', err);
  }

}

exports.getBlog = async function(id) {
    try {
      let allBlogs = await exports.getAllBlogs();

      if (allBlogs[id]) {
        console.log(id)
        return allBlogs[id];
      }
    } catch (err) {
      console.log(err)
    }
}

exports.saveBlog = async function(id, newBlog) {
  try {
    let allBlogs = await exports.getAllBlogs();
    allBlogs[id] = newBlog;
    for (name in allBlogs) {
      let blog = allBlogs[name];
      let oneBlog = await db.collection('blogs').doc(blog.id);
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
  } catch (err) {
    console.log('Error getting documents', err);
  }
}

exports.updateBlog = async function(id, blogData) {
  await exports.saveBlog(id, blogData)
}

exports.deleteBlog = async function(id) {
  try{
    await db.collection('blogs').doc(id).delete();
  }
  catch (err){
    console.log(err);
  }
}
