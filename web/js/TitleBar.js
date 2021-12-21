
function TitleBar(){

  let titleBar = document.createElement('div');

  let title = document.createElement('h1');
  title.style.display = 'inline-block';
  let link = document.createElement('a');
  link.href = "javascript:Application.goto('main')";
  link.innerText = "Forum";
  title.appendChild(link);
  titleBar.appendChild(title);

  let userSpan = document.createElement('span');
  userSpan.style.float = 'right';
  titleBar.appendChild(userSpan);

  titleBar.refresh = async function(){

    let user = JSON.parse(await GET('api/user.php'));
    Application.user = user;
    userSpan.innerText = '';

    if(user.loggedIn){
      let username = document.createElement('span');
      username.innerText = user.username;
      userSpan.appendChild(username);
      let logout = document.createElement('button');
      logout.onclick = async function(){
        await POST('api/logout.php');
        Application.goto('main');
      }
      logout.innerText = "Logout";
      userSpan.appendChild(logout);
    } else {
      let login = document.createElement('button');
      login.onclick = function(){
        Application.goto('login');
      }
      login.innerText = "Login";
      userSpan.appendChild(login);
    }

  }

  return titleBar;

}
