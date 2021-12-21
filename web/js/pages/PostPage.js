
function PostPage(){

  let pageDiv = document.createElement('div');

  let titleBar = new TitleBar();
  pageDiv.appendChild(titleBar);

  let title = document.createElement('input');
  pageDiv.appendChild(document.createTextNode('Title:'));
  pageDiv.appendChild(title);

  let contentEditor;
  let editorWrapper = document.createElement('div');
  pageDiv.appendChild(editorWrapper);

  let postTo;
  let postToId;

  let post = document.createElement('button');
  post.innerText = 'Post';
  post.onclick = async function(){
    if(postTo=='panelGroup'){
      await POST('api/postToPanelGroup.php', JSON.stringify({
        'title': title.value,
        'content': contentEditor.getContent(),
        'panelGroupId': postToId,
      }));
    } else {
      await POST('api/post.php', JSON.stringify({
        'title': title.value,
        'content': contentEditor.getContent(),
      }));
    }
    Application.goto('main');
  }
  pageDiv.appendChild(post);

  pageDiv.onLoad = async function(args){

    await titleBar.refresh();

    postTo = args[0];
    postToId = args[1];

    if(!Application.user.loggedIn){
      if(postTo){
        Application.return = 'post:'+postTo+':'+postToId;
      } else {
        Application.return = 'post';
      }
      Application.goto('login', false);
    }

    editorWrapper.innerText = '';
    contentEditor = createContentEditor();
    editorWrapper.appendChild(contentEditor);

  }

  return pageDiv;

}
