const fs = require('fs');
const ejs = require('ejs');

//read blog post content and convert to JS object
let blog_content = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));
let blogTemplate = fs.readFileSync('views/blog_post.ejs', 'utf8');
console.log(__dirname + '/views/blog_post.ejs');

for (let i = 0; i < blog_content.length; i++){
  let arr = blog_content[i]["content"].split("\n");
  blog_content[i]["content"] = arr[0];
  blog_content[i]["content2"] = arr[1];
  let entry = blog_content[i];
  let entry2 = blog_content;
  let post = ejs.render(blogTemplate, {
    filename: __dirname + '/views/blog_post.ejs',
    //if __dirname doesn't work for linking later (should work automatically, can replace __dirname with github.io link)
    data: entry,
    data2: entry2
  });
  let title = entry["title"];
  let name = "build/" + title.split(" ").join("_") + ".html";

  fs.writeFileSync(name, post, 'utf8');
} //end for loop

//generate about.html
let about_template = fs.readFileSync('views/about.ejs','utf8');
let entry3 = blog_content;
let about = ejs.render(about_template, {
  filename: __dirname + '/views/about.ejs',
  data: entry3

});
fs.writeFileSync("build/about.html", about, 'utf8');

//generate index.html
let index_template = fs.readFileSync('views/index.ejs', 'utf8');
let entry = blog_content;
let index_html = ejs.render(index_template, {
  filename: __dirname + '/views/index.ejs',
  data: entry
});
fs.writeFileSync('build/index.html', index_html, 'utf8');
