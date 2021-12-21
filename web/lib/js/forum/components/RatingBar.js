
// TODO methods to change labels

function createRatingBar() {

  const BOX_WIDTH = 500;
  const BOX_HEIGHT = 25;
  const BAR_X = 100;
  const BAR_Y = 2;
  const BAR_WIDTH = 300;
  const BAR_HEIGHT = 15;
  const OVERLAY_TOP = 40;
  const OVERLAY_LEFT = 0;
  const OVERLAY_WIDTH = 500;
  const OVERLAY_HEIGHT = 85;

  let values = [];
  let vote = null;
  let preview = null;
  let average = 0;
  let maxBlockCount = 0;
  let blocks = {};

  function calculateValues(){

    blocks = {};
    average = 0;
    maxBlockCount = 0;

    if(values.length || vote!=null){

      for(let val of values){
        average += val;
        blocks[val] = blocks[val]?blocks[val]+1:1;
      }

      if(vote!=null){
        average += vote;
        blocks[vote] = blocks[vote]?blocks[vote]+1:1;
      }

      average /= values.length+(vote==null?0:1);

      for(let block in blocks){
        if(blocks[block]>maxBlockCount){
          maxBlockCount = blocks[block];
        }
      }

    }

  }

  function drawBar(ctx, x, y, width, height){

    ctx.textAlign = "center";

    let blockSize = width/21.0;

    for(let i = 0; i<21; i++){

      let blockNum = i-10;

      if(blocks[blockNum]){
        let relativeVal = blocks[blockNum]/maxBlockCount;
        let colorVal = (1-relativeVal)*255;
        ctx.fillStyle = 'rgb(255, '+colorVal+', '+colorVal+')';
        ctx.fillRect(x+i*blockSize, y, blockSize, height);
      }

    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x, y, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FC0';
    ctx.strokeRect(x+width/2+average*width/21-2, y, 4, height);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#FC0';
    ctx.fillText('Average: '+average+' - '+(values.length+(vote==null?0:1))+' votes', x+width/2+average*width/21, y-6);

    if(preview!=null){
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#6897';
      ctx.strokeRect(x+(preview+10)*blockSize, y, blockSize, height);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#0DE';
      if(vote!=null && preview==vote) ctx.fillText('Cancel vote', x+width/2+preview*width/21, y-23);
      else ctx.fillText('Vote: '+preview, x+width/2+preview*width/21, y-23);
    }

    if(vote!=null){
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0DE';
      ctx.strokeRect(x+(vote+10)*blockSize, y, blockSize, height);
    }

    for(let i = 0; i<21; i++){
      ctx.lineWidth = i%10==0?3:1;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(x+i*blockSize+blockSize/2, y+height);
      ctx.lineTo(x+i*blockSize+blockSize/2, y+height+8);
      ctx.stroke();
    }

    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('-10', x+0*blockSize+blockSize/2, y+height+25);
    ctx.fillText('0', x+10*blockSize+blockSize/2, y+height+25);
    ctx.fillText('10', x+20*blockSize+blockSize/2, y+height+25);

    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Not Cool', x-ctx.measureText('Not Cool').width/2-4, y+height-2);
    ctx.fillText('Cool', x+width+ctx.measureText('Cool').width/2+4, y+height-1);

  }

  let ratingBar = document.createElement('div');

  let canvas = document.createElement('canvas');
  canvas.width = BOX_WIDTH;
  canvas.height = BOX_HEIGHT;
  ratingBar.appendChild(canvas);
  let ctx = canvas.getContext('2d');

  let overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.display = 'none';
  let overlayCanvas = document.createElement('canvas');
  overlayCanvas.width = OVERLAY_WIDTH;
  overlayCanvas.height = OVERLAY_HEIGHT;
  overlay.appendChild(overlayCanvas);
  ratingBar.appendChild(overlay);
  let overlayCtx = overlayCanvas.getContext('2d');

  ratingBar.setValues = function(valuesList){
    values = valuesList;
    ratingBar.refresh();
  }

  ratingBar.setVote = function(value){
    vote = value;
    ratingBar.refresh();
  }

  ratingBar.refresh = function(){

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    overlayCtx.fillStyle = 'white';
    overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    overlayCtx.strokeStyle = 'black';
    overlayCtx.strokeRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    calculateValues();

    drawBar(ctx, BAR_X, BAR_Y, BAR_WIDTH, BAR_HEIGHT);
    drawBar(overlayCtx, BAR_X+OVERLAY_LEFT, BAR_Y+OVERLAY_TOP, BAR_WIDTH, BAR_HEIGHT);

  }

  ratingBar.refresh();

  document.addEventListener('click', function(e){

    let canvasPos = canvas.getBoundingClientRect();

    if(e.clientX>canvasPos.left+BAR_X && e.clientX<canvasPos.left+BAR_X+BAR_WIDTH && e.clientY>canvasPos.top+BAR_Y && e.clientY<canvasPos.top+BAR_Y+BAR_HEIGHT){

      let value = Math.floor((e.clientX-canvasPos.left-BAR_X)/BAR_WIDTH*21-10);
      if(vote==value) {
        // vote = null;
        if(ratingBar.onVoteCancel) ratingBar.onVoteCancel(value);
      } else {
        // vote = value;
        if(ratingBar.onVote) ratingBar.onVote(value);
      }

      // ratingBar.refresh();

    }

  });

  document.addEventListener('mousemove', function(e){

    let canvasPos = canvas.getBoundingClientRect();

    if(e.clientX>canvasPos.left+BAR_X && e.clientX<canvasPos.left+BAR_X+BAR_WIDTH && e.clientY>canvasPos.top+BAR_Y && e.clientY<canvasPos.top+BAR_Y+BAR_HEIGHT){

      overlay.style.display = 'block';
      overlay.style.left = (canvas.offsetLeft-OVERLAY_LEFT)+'px';
      overlay.style.top = (canvas.offsetTop-OVERLAY_TOP)+'px';

      let value = Math.floor((e.clientX-canvasPos.left-BAR_X)/BAR_WIDTH*21-10);
      preview = value;

      ratingBar.refresh();

    } else {

      overlay.style.display = 'none';

      preview = null;

      ratingBar.refresh();

    }

  });

  return ratingBar;

}
