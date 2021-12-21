
function PanelPage(){

  let pageDiv = document.createElement('div');

  let titleBar = new TitleBar();
  pageDiv.appendChild(titleBar);

  let contentDiv = document.createElement('div');

  let sidebar = document.createElement('div');
  sidebar.style.width = '20%';
  sidebar.style.display = 'inline-block';
  contentDiv.appendChild(sidebar);

  let feedDiv = document.createElement('div');
  feedDiv.style.width = '70%';
  feedDiv.style.display = 'inline-block';
  contentDiv.appendChild(feedDiv);

  pageDiv.appendChild(contentDiv);

  let groupId = null;

  async function showGroup(id){

    groupId = id;

    feedDiv.innerText = '';

    let group = JSON.parse(await GET('api/getPanelGroup.php?id='+id));

    feedDiv.appendChild(document.createTextNode('Posts from '+group.content.name+':'));
    feedDiv.appendChild(document.createElement('br'));

    let posts = JSON.parse(await GET('api/getPanelGroupPosts.php?groupId='+id));

    for(let post of posts){
      feedDiv.appendChild(new PostView(post));
    }

  }

  pageDiv.onLoad = async function(args){

    feedDiv.innerText = '';

    groupId = null;

    sidebar.innerText = '';

    let panel = JSON.parse(await GET('api/getPanel.php?id='+args[0]));

    sidebar.appendChild(document.createTextNode('Panel '+panel.content.name+':'));
    sidebar.appendChild(document.createElement('br'));

    let groups = JSON.parse(await GET('api/getPanelGroups.php?panelId='+args[0]));

    if(groups.length>0) showGroup(groups[0].id);

    sidebar.appendChild(document.createTextNode('Groups:'));
    sidebar.appendChild(document.createElement('br'));

    for(let group of groups){
      let a = document.createElement('a');
      a.innerText = group.name;
      // a.href = "javascript:showGroup("+group.id+")";
      a.href = 'javascript:void(0);';
      a.onclick = async function(){
        showGroup(group.id, group.name);
      }
      sidebar.appendChild(a);
      sidebar.appendChild(document.createElement('br'));
    }

    sidebar.appendChild(document.createTextNode('New group:'));
    sidebar.appendChild(document.createElement('br'));
    sidebar.appendChild(document.createTextNode('Name:'));
    let groupName = document.createElement('input');
    let createGroup = document.createElement('button');
    createGroup.innerText = 'Create';
    createGroup.onclick = async function(){
      if(Application.user.loggedIn){
        await POST('api/createPanelGroup.php', {'panelId': args[0], 'name': groupName.value});
        Application.goto('panel:'+args[0], false);
      } else {
        Application.return = 'panel:'+args[0];
        Application.goto('login');
      }
    }
    sidebar.appendChild(groupName);
    sidebar.appendChild(createGroup);
    sidebar.appendChild(document.createElement('br'));

    let post = document.createElement('a');
    post.onclick = function(){
      if(Application.user.loggedIn){
        if(groupId!=null){
          Application.goto("post:panelGroup:"+groupId);
        }
      } else {
        Application.return = 'panel:'+args[0];
        Application.goto('login');
      }
    }
    //post.href = 'javascript:Application.goto("post:panelGroup:'+groupId+'")';
    post.href = 'javascript:void(0);';
    post.innerText = 'Post';
    sidebar.appendChild(post);

    /*let posts = JSON.parse(await GET('api/getPosts.php'));

    for(let post of posts){
      feedDiv.appendChild(new PostView(post));
    }*/

    titleBar.refresh();

  }

  return pageDiv;

}
