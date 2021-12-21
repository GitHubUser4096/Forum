
function LoginPage(){

  let pageDiv = document.createElement('div');

  let titleBar = new TitleBar();
  pageDiv.appendChild(titleBar);

  let title = document.createElement('h1');
  title.innerText = 'Login';
  pageDiv.appendChild(title);

  let msgDiv = document.createElement('div');
  pageDiv.appendChild(msgDiv);

  let username = document.createElement('input');
  let password = document.createElement('input');
  password.type = 'password';
  let loginBtn = document.createElement('button');
  loginBtn.innerText = 'Login';
  loginBtn.onclick = async function(e){
    let response = JSON.parse(await POST('api/login.php', {'username':username.value,'password':password.value}));
    if(response.success){
      if(Application.return){
        Application.goto(Application.return, false);
        delete Application.return;
      } else {
        Application.goto('main', false);
      }
    } else {
      msgDiv.innerText = response.message;
    }
  }

  pageDiv.appendChild(document.createTextNode('Username:'));
  pageDiv.appendChild(username);
  pageDiv.appendChild(document.createElement('br'));
  pageDiv.appendChild(document.createTextNode('Password:'));
  pageDiv.appendChild(password);
  pageDiv.appendChild(document.createElement('br'));
  pageDiv.appendChild(loginBtn);

  let newAcc = document.createElement('a');
  newAcc.href = 'javascript:Application.goto("newAccount")';
  newAcc.innerText = 'New account';
  pageDiv.appendChild(document.createElement('br'));
  pageDiv.appendChild(newAcc);

  pageDiv.onLoad = async function(){
    await titleBar.refresh();
    if(Application.user.loggedIn){
      Application.goto('main');
    } else {
      msgDiv.innerText = '';
    }
  }

  return pageDiv;

}
