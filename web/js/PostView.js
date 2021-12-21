
function PostView(post){

  let div = document.createElement('div');

  let title = document.createElement('h2');
  let link = document.createElement('a');
  link.href = "javascript:Application.goto('viewPost:"+post.id+"');";
  link.innerText = post.title;
  title.appendChild(link);
  div.appendChild(title);

  div.appendChild(new ContentView(post.content));
  div.appendChild(new ForumRatingBar(post.content.id));

  return div;

}
