
function ForumRatingBar(contentId){

  let ratingBar = createRatingBar();

  ratingBar.onVote = function(value){

    if(!Application.user.loggedIn){
      Application.goto('login');
    } else {
      POST('api/vote.php', {
        'contentId': contentId,
        'typeId': 1,
        'value': value,
      }).then(()=>{
        ratingBar.reloadVotes();
      });
    }

  }

  ratingBar.onVoteCancel = function(){

    POST('api/clearVote.php', {
      'contentId': contentId,
      'typeId': 1,
    }).then(()=>{
      ratingBar.reloadVotes();
    });;

  }

  ratingBar.reloadVotes = async function(){

    let votes = JSON.parse(await GET('api/getVotes.php?contentId='+contentId+'&typeId=1'));
    ratingBar.setValues(votes);

    let myVote = JSON.parse(await GET('api/getMyVote.php?contentId='+contentId+'&typeId=1'));

    if(myVote.exists){
      ratingBar.setVote(myVote.value);
    } else {
      ratingBar.setVote(null);
    }

    ratingBar.refresh();

  }

  ratingBar.reloadVotes();

  return ratingBar;

}
