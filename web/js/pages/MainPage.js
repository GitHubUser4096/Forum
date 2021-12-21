
function MainPage(){

  let pageDiv = document.createElement('div');

  let titleBar = new TitleBar();
  pageDiv.appendChild(titleBar);

  let contentDiv = document.createElement('div');

  contentDiv.appendChild(document.createTextNode('Panels:'));

  let panelsDiv = document.createElement('div');
  contentDiv.appendChild(panelsDiv);

  contentDiv.appendChild(document.createTextNode('New panel:'));
  contentDiv.appendChild(document.createElement('br'));
  contentDiv.appendChild(document.createTextNode('Name:'));
  let panelName = document.createElement('input');
  let createPanel = document.createElement('button');
  createPanel.innerText = 'Create';
  createPanel.onclick = async function(){
    if(Application.user.loggedIn){
      await POST('api/createPanel.php', {'name': panelName.value});
      panelName.value = '';
      Application.goto('main', false);
    } else {
      Application.return = 'main';
      Application.goto('login');
    }
  }
  contentDiv.appendChild(panelName);
  contentDiv.appendChild(createPanel);

  pageDiv.appendChild(contentDiv);

  pageDiv.onLoad = async function(){

    titleBar.refresh();

    panelsDiv.innerText = '';

    let panels = JSON.parse(await GET('api/getPanels.php'));

    for(let panel of panels){
      let a = document.createElement('a');
      a.innerText = panel.name;
      a.href = "javascript:Application.goto('panel:"+panel.id+"')";
      panelsDiv.appendChild(a);
      panelsDiv.appendChild(document.createElement('br'));
    }

  }

  return pageDiv;

}
