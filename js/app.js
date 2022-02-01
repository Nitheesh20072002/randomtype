
const wordcount=document.querySelector('#wordcount');
const restart=document.querySelector('.forrestart');

async function getword(count) {
  let url="https://random-word-api.herokuapp.com/word?number=1000&swear=0";
  const response = await axios.get(url);
  wordconv(response.data,count);
}
function wordconv(res,count){
  let str="";
  let req=0,pos=0;
  while(req<count && pos<1000){
    if(res[pos].length<9){
      str+=`${res[pos]} `;  
      req++;
    }
    pos++;
  }
  const paradisp=document.querySelector('.paradisp');
  paradisp.textContent=str;
}


wordcount.addEventListener('change', (eve)=>{
  const timeworddisp=document.querySelector('.timecnt');
  var curcnt=eve.target.value;
  timeworddisp.textContent=`${curcnt}`;
  getword(curcnt);
})

restart.addEventListener('click',(eve)=>{
  const cnt=wordcount.value;
  getword(cnt);
})
