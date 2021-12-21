
const Application = new (function(){

  this.pages = {};

  this.goto = async function(page, newState=true){

    if(!page) page = 'main';

    let args = page.split(":");

    let pageObj = this.pages[args[0]];

    document.body.innerText = '';
    document.body.appendChild(pageObj);

    if(pageObj.onLoad) pageObj.onLoad(args.slice(1));

    if(newState) history.pushState(page, page, '?'+page);
    else history.replaceState(page, page, '?'+page);

  };

  window.addEventListener('popstate', function(e){
    Application.goto(e.state, false);
  });

  this.load = function(){

    let page = null;
    if(location.href.indexOf('?')>=0){
      page = location.href.substring(location.href.indexOf('?')+1);
    }

    this.goto(page, false);

  };

});
