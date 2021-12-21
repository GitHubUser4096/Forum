
function CommentEditor(parentId){

  let div = document.createElement('div');

  let contentEditor = createContentEditor();
  div.appendChild(contentEditor);

  let cancel = document.createElement('button');
  cancel.innerText = 'Cancel';
  cancel.onclick = function(){
    div.remove();
  }
  div.appendChild(cancel);

  let submit = document.createElement('button');
  submit.innerText = 'Submit';
  submit.onclick = async function(){
    await POST('api/comment.php', JSON.stringify({
      'parentId': parentId,
      'content': contentEditor.getContent(),
    }));
    if(div.onSubmit) div.onSubmit();
    div.remove();
  }
  div.appendChild(submit);

  return div;

}
