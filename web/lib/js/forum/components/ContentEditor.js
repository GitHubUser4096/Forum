
// TODO language support
// TODO option to change values (in case of editing)
// TODO proper classnames for custom CSSes

function createContentEditor(){

  function createRadioSelect(options){

    let radioSelect = document.createElement('div');
    radioSelect.value = null;

    let labels = [];

    if(options && options.length){

      for(let i in options){

        let label = document.createElement('label');

        let radio = document.createElement('input');
        radio.type = 'checkbox';
        radio.oninput = function(e){
          for(let lbl of labels){
            lbl.radio.checked = false;
          }
          radio.checked = true;
          radioSelect.value = i;
          if(radioSelect.onSelect) radioSelect.onSelect(i);
        }

        label.radio = radio;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(options[i]));

        labels.push(label);

        radioSelect.appendChild(label);

      }

      labels[0].radio.checked = true;
      radioSelect.value = 0;

    }

    return radioSelect;

  }

  let contentEditor = document.createElement('div');
  contentEditor.className = 'forum-contentEditor';

  let blocksContainer = document.createElement('div');
  blocksContainer.className = 'forum-blocks';
  contentEditor.appendChild(blocksContainer);

  let addBlockBtn = document.createElement('button');
  addBlockBtn.innerText = 'Add section';
  addBlockBtn.className = 'forum-addBlockBtn';
  addBlockBtn.onclick = function(e){
    addBlock(createBlock());
  }
  contentEditor.appendChild(addBlockBtn);

  function createBlock(){

    let block = document.createElement('div');

    block.appendChild(document.createTextNode('Section'));

    let closeBtn = document.createElement('button');
    closeBtn.innerText = 'X';
    closeBtn.onclick = function(e){
      removeBlock(block);
    }
    block.appendChild(closeBtn);

    /*let typeSelector = document.createElement('div');
    typeSelector.appendChild(document.createTextNode('Type:'));

    let type1 = document.createElement('label');
    let type1radio = document.createElement('input');
    type1radio.type = 'radio';
    type1.appendChild(type1radio);
    type1.appendChild(document.createTextNode('Citation'));
    typeSelector.appendChild(type1);

    let type2 = document.createElement('label');
    let type2radio = document.createElement('input');
    type2radio.type = 'radio';
    type2.appendChild(type2radio);
    type2.appendChild(document.createTextNode('Interpretation'));
    typeSelector.appendChild(type2);

    let type3 = document.createElement('label');
    let type3radio = document.createElement('input');
    type3radio.type = 'radio';
    type3.appendChild(type3radio);
    type3.appendChild(document.createTextNode('General'));
    typeSelector.appendChild(type3);

    block.appendChild(typeSelector);*/

    block.style.background = '#EEF';

    let typeSelector = createRadioSelect(['Citation', 'Interpretation', 'General']);
    typeSelector.onSelect = function(value){
      metaDiv.style.display = (value==0 || value==1) ? 'block' : 'none';
      block.style.background = ['#EEF', '#EFE', '#FFE'][value];
    }
    block.appendChild(typeSelector);

    let metaDiv = document.createElement('div');
    metaDiv.appendChild(document.createTextNode('Meta:'));
    let metaInput = document.createElement('input');
    metaDiv.appendChild(metaInput);
    block.appendChild(metaDiv);

    let contentLabel = document.createElement('div');
    contentLabel.appendChild(document.createTextNode('Content:'));
    block.appendChild(contentLabel);

    let contentInput = document.createElement('textarea');
    block.appendChild(contentInput);

    block.getContent = function(){
      return {
        blockType: ['citation', 'interpretation', 'general'][typeSelector.value],
        meta: metaInput.value,
        text: contentInput.value,
      };
    }

    return block;

  }

  let blocks = [];
  function addBlock(block){
    blocks.push(block);
    blocksContainer.appendChild(block);
  }

  function removeBlock(block){
    blocks.splice(blocks.indexOf(block), 1);
    blocksContainer.removeChild(block);
    if(blocks.length==0){
      addBlock(createBlock());
    }
  }

  addBlock(createBlock());

  contentEditor.getContent = function(){

    let res = {
      'blocks': [],
    };

    for(let block of blocks){
      res.blocks.push(block.getContent());
    }

    return res;

  }

  return contentEditor;

}
