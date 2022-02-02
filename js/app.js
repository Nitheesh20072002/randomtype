// HTML selectors
const wordcount=document.querySelector('#wordcount');
const restart1=document.querySelector('.forrestart1');
const restart2=document.querySelector('.forrestart2');
const inp=document.querySelector('.typed');
const correctwords=document.querySelector('.correct');

// Variable declarations
let wordtyped=0,curposinpara=0;
let count=0;let last=0;

// API call
async function getword() {
  let url="https://random-word-api.herokuapp.com/word?number=1000&swear=0";
  const response = await axios.get(url);
  wordconv(response.data);
}

function wordconv(res){
  let str="";
  let req=0,pos=0;
  const paradisp=document.querySelector('.paradisp');
  clearing(paradisp);
  while(req<count && pos<1000){
    if(res[pos].length<9){
      str+=`${res[pos]} `;  
      const node=document.createElement("div");
      const textinnode=document.createTextNode(`${res[pos]}`);
      node.appendChild(textinnode);
      node.setAttribute('class','wordsinpara');
      node.setAttribute('id',"wordsinpara"+`${req}`);
      paradisp.appendChild(node);
      req++;
    }
    pos++;
  }
}


wordcount.addEventListener('change', (eve)=>{
  wordtyped=0;curposinpara=0;
  last=0;
  correctwords.textContent="correct words: 0";
  const timeworddisp=document.querySelector('.timecnt');
  var curcnt=eve.target.value;
  count=curcnt;
  timeworddisp.textContent=`${curcnt}`;
  getword(curcnt);
})

function restart(){
  last=0;
  const paradisp=document.querySelector('.paradisp');
  clearing(paradisp);
  wordtyped=0;curposinpara=0;
  correctwords.textContent="correct words: 0";
  const cnt=wordcount.value;
  getword(cnt);
  inp.value="";
}
restart1.addEventListener('click',(eve)=>{
  restart();
})
restart2.addEventListener('click',(eve)=>{
  restart();
  const midpar1=document.querySelector('.midpart1');
  const midpar2=document.querySelector('.midpart2');
  midpar2.style.display="none";
  midpar1.style.display="block";
})
inp.addEventListener('keyup', eve =>{
  if(curposinpara<count){
    if(eve.code== 'Space'){
      let x=inp.value.slice(0,-1);
      check(x);
      if(curposinpara>10){
        clearfirsrtline();
      }
      inp.value="";
      curposinpara++;
      if(curposinpara==count) finished();
    }
  }else{
    finished();
  }
})

function check(curstr){
  const curstrinpara=document.querySelector(`#wordsinpara${curposinpara}`);

  if(`${curstrinpara.textContent}`==`${curstr}`){
    wordtyped++;
    correctwords.textContent=`correct words:${wordtyped}`;
    curstrinpara.classList.add('correctspelled');
  }else{
    curstrinpara.classList.add('wrongspelled');
  }
}

function clearing(clearvar){
  while(clearvar.firstChild){
    clearvar.removeChild(clearvar.firstChild);
  }
}

function finished(){
  const midpar1=document.querySelector('.midpart1');
  const midpar2=document.querySelector('.midpart2');
  const wp=document.querySelector('.wpm');
  wp.textContent=`${wordtyped}`;
  midpar1.style.display="none";
  midpar2.style.display="block";
}

function clearfirsrtline(){
  const widt=document.querySelector('.paradisp').offsetWidth;
  let curlen=0;
  // may become too time Complexed
  for(let i=last;i<=curposinpara;i++){
    const x=document.querySelector("#wordsinpara"+`${i}`).offsetWidth;
    if(curlen+x > widt){
      for(let j=last;j<i;j++){
        document.querySelector("#wordsinpara"+`${j}`).style.display='none';
      }
      last=i;
      break;
    }else{
      curlen+=x;
    }
  }
}