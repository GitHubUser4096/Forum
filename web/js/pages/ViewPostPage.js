
function ViewPostPage(){

  let pageDiv = document.createElement('div');

  let titleBar = new TitleBar();
  pageDiv.appendChild(titleBar);

  let commentWrapper = document.createElement('div');

  let postDiv = document.createElement('div');
  pageDiv.appendChild(postDiv);

  pageDiv.onLoad = async function(args){

    postDiv.innerText = '';

    titleBar.refresh();

    let post = JSON.parse(await GET('api/getPost.php?id='+args[0]));

    let title = document.createElement('div');
    title.innerText = post.title;
    postDiv.appendChild(title);

    postDiv.appendChild(new ContentView(post.content));
    postDiv.appendChild(new ForumRatingBar(post.content.id));

    let commentBtn = document.createElement('button');
    commentBtn.innerText = 'Comment';
    commentBtn.onclick = function(){
      if(Application.user.loggedIn){
        commentWrapper.innerText = '';
        let commentEditor = new CommentEditor(post.content.id);
        commentEditor.onSubmit = function(){
          loadComments();
        }
        commentWrapper.appendChild(commentEditor);
      } else {
        Application.return = 'viewPost:'+args[0];
        Application.goto('login');
      }
    }
    postDiv.appendChild(commentBtn);

    let commentsDiv = document.createElement('div');

    async function loadComments(){

      commentsDiv.innerText = '';

      let comments = JSON.parse(await GET('api/getComments.php?parent='+post.content.id));

      function getComments(comments){
        let commentDivs = [];
        for(let comment of comments){
          let commentDiv = document.createElement('div');
          commentDiv.style.marginLeft = '25px';
          commentDiv.appendChild(new ContentView(comment.content));
          commentDiv.appendChild(new ForumRatingBar(comment.content.id));
          let commentBtn = document.createElement('button');
          commentBtn.innerText = 'Comment';
          commentBtn.onclick = function(){
            let commentEditor = new CommentEditor(comment.content.id);
            commentEditor.onSubmit = function(){
              loadComments();
            }
            commentWrapper.appendChild(commentEditor);
          }
          commentDiv.appendChild(commentBtn);
          let childComments = getComments(comment.comments);
          for(let childComment of childComments){
            commentDiv.appendChild(childComment);
          }
          commentDivs.push(commentDiv);
        }
        return commentDivs;
      }

      let commentDivs = getComments(comments);
      for(let commentDiv of commentDivs){
        commentsDiv.appendChild(commentDiv);
      }

    }

    loadComments();

    postDiv.appendChild(commentsDiv);

  }

  pageDiv.appendChild(commentWrapper);

  return pageDiv;

}
