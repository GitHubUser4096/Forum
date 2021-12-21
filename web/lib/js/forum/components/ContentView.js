
function ContentView(content){

  let div = document.createElement('div');

  let posted = document.createElement('em');
  posted.innerText = content.user.username+' | '+content.dateTimePosted;
  div.appendChild(posted);

  let blocks = document.createElement('div');
  for(let block of content.blocks){

    let blockDiv = document.createElement('div');
    blockDiv.style.background = ['#EEF', '#EFE', '#FFE'][['citation', 'interpretation', 'general'].indexOf(block.blockType)];

    let blockText = document.createElement('div');
    blockText.innerText = block.text;
    blockDiv.appendChild(blockText);

    let blockMeta = document.createElement('em');
    blockMeta.innerText = ['Citation of: ', 'Interpretation of: ', ''][['citation', 'interpretation', 'general'].indexOf(block.blockType)]+block.meta;
    blockDiv.appendChild(blockMeta);

    blocks.appendChild(blockDiv);

  }
  div.appendChild(blocks);

  return div;

}
