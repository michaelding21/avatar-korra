
var fs = require('fs');

exports.getAllBlogs = async function() {
  var blogData = fs.readFileSync('data/blog.json', 'utf8');
  return JSON.parse(blogData);
}

exports.getBlog = async function(id) {
  var blogData = await exports.getAllBlogs();

  if (blogData[id]) return blogData[id];

  return {};
}

exports.saveBlog = function(id, newBlog) {
  var blogData = exports.getAllBlogs();
  blogData[id] = newBlog;
  fs.writeFileSync('data/blog.json', JSON.stringify(blogData));
}

exports.updateBlog = function(id, blogData) {
  exports.saveBlog(id, blogData)
}

exports.deleteBlog = function(id) {
  var blogData = exports.getAllBlogs();
  delete blogData[id];
  fs.writeFileSync('data/blog.json', JSON.stringify(blogData));
}
