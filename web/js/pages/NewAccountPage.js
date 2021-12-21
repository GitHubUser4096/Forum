
function NewAccountPage(){

  let pageDiv = document.createElement('div');

  let titleBar = new TitleBar();
  pageDiv.appendChild(titleBar);

  let title = document.createElement('h1');
  title.innerText = 'New Account';
  pageDiv.appendChild(title);

  let msgDiv = document.createElement('div');
  pageDiv.appendChild(msgDiv);

  let username = document.createElement('input');
  let password = document.createElement('input');
  password.type = 'password';
  let confirmPassword = document.createElement('input');
  confirmPassword.type = 'password';
  let loginBtn = document.createElement('button');
  loginBtn.innerText = 'Create';
  loginBtn.onclick = async function(e){
    if(password.value!=confirmPassword.value){
      msgDiv.innerText = 'Passwords do not match!';
      return;
    }
    let response = JSON.parse(await POST('api/newAccount.php', {'username':username.value,'password':password.value}));
    if(response.success){
      Application.goto('main');
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
  pageDiv.appendChild(document.createTextNode('Confirm Password:'));
  pageDiv.appendChild(confirmPassword);
  pageDiv.appendChild(document.createElement('br'));
  pageDiv.appendChild(loginBtn);

  let login = document.createElement('a');
  login.href = 'javascript:Application.goto("login")';
  login.innerText = 'Login';
  pageDiv.appendChild(document.createElement('br'));
  pageDiv.appendChild(login);

  pageDiv.onLoad = function(){
    msgDiv.innerText = '';
    titleBar.refresh();
  }

  return pageDiv;

}
