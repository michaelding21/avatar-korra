let blogPost = document.getElementsByTagName("h1")[0].innerText.split(' ').join('_');
let buttons = document.getElementsByClassName("likes");
let len = buttons.length;
like_button(len);

function like_button(x) {
  for (let i = 0; i < x; i++) {
    document.getElementById("like_button #" + i.toString()).addEventListener('click', function() {
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", "/blog/like/" + blogPost.split('_').join(' '), true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      // Define the data you’d like to send to the server
      let postData = {
        "c": i, // c  com
        "like": 1
      };
      xmlhttp.send(JSON.stringify(postData));
      xmlhttp.onreadystatechange = function(data) {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          let blogObject = JSON.parse(xmlhttp.responseText);
          document.getElementById("like_count #" + i.toString()).innerText = blogObject.comments[i].likes;
        } else {}}
    });
  }}

document.getElementById("comment_button").addEventListener('click', function() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "/blog/comments/" + blogPost.split('_').join(' '), true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // Define the data you’d like to send to the server
  let postData = {
    "user2": document.getElementById("user_comment").value,
    "content2": document.getElementById("content_comment").value
  };
  if (document.getElementById("user_comment").value !== "" && document.getElementById("content_comment").value !== ""){
    xmlhttp.send(JSON.stringify(postData));
    xmlhttp.onreadystatechange = function(data) {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {} else {}
    }
    let public_comment = document.getElementById("comments").innerHTML;
    public_comment += '' + '<div class="row" id=" comment #' + len + '"><div><h4>' + document.getElementById("user_comment").value + ' at this time ' + new Date().toLocaleString() + '</h4><p>' + document.getElementById("content_comment").value + '</p></div><div class="col"><h3>Likes <span class="likes" id="like_count #' + len + '"></span> <button id="like_button #' + len + '" type="button">Like</button></h3></div></div><br>';
    len++;
    document.getElementById("comments").innerHTML = public_comment;
    like_button(len);
  } else if (document.getElementById("user_comment").value === "") alert("Please choose an author.")
  else if (document.getElementById("content_comment").value === "") alert("Please include content.")
});
