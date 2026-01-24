import {fetchingData} from '/main-quran/fetchingData.js';
import {show,seekBar} from '/main-quran/show.js';
import {audioPause, loadAudio, playAud} from '/main-quran/loadAudio.js';


//const API_TAFSIR = 'https://equran.id/api/v2/tafsir/'
 // let id = new URLSearchParams(window.location.search).get("id");
 let id = 0;
 const pathname = window.location.pathname;
 if (pathname == '/alquran.html') {
   id = 1;
 }else {
   id = new URLSearchParams(window.location.search).get("id");
 }
  let indexGlobal = 0;
  let audioUrl = [];
  let lengthAyat = 0;
  
  const app = document.getElementById('app');
  
  window.addEventListener('load', loadPage(id),false)
  
  async function loadPage(id) {
    const ayat = await fetchingData(id);
    app.innerHTML = await show(ayat)
    audioUrl =await loadAudio(ayat);
    lengthAyat = await (ayat.length-1);
    let arabs = document.querySelectorAll('.arab');
    arabs.forEach((arab,i)=>{
      arab.addEventListener('click', (e)=>{
        indexGlobal = i;
        const element = arabs[indexGlobal]
      control(element, indexGlobal);
      })
  })
  const humbers = document.querySelectorAll('#humber');
  humbers.forEach((humber)=>{
    humber.addEventListener('click',(e)=>{
    })
  })
  }
  
async  function control(element,indexGlobal) {
    const audio = document.getElementById('audio');
        audio.src = audioUrl[indexGlobal];
        const playing = element.classList.contains('playing');
        playing ? audioPause(element, indexGlobal) : playAud(element, indexGlobal);
  }
 
  
const audio = document.getElementById('audio');
audio.addEventListener('timeupdate',()=>{
  seekBar()
})
audio.addEventListener('ended', async ()=>{
  if (indexGlobal == lengthAyat) {
  id++;
  await loadPage(id);
indexGlobal = 0;
const arabs = document.querySelectorAll('.arab');
      const element = await arabs[indexGlobal];
  control(element, indexGlobal);
  } else {
    const arabs = document.querySelectorAll('.arab');
          indexGlobal++;
      const element =  arabs[indexGlobal]
control(element, indexGlobal);
  }
})

const btnNext = document.getElementById('btn-next');
btnNext.addEventListener('click', () => {
  window.scrollTo({top:0})
  id++;
  loadPage(id);
      document.getElementById('footer').style.visibility = 'hidden';
  const audio = document.getElementById('audio');
  audio.pause();
})

const tools = document.getElementById('tools');
tools.addEventListener('click',(e)=>{
  console.log(e.target)
})




const toggle = document.querySelector("#toggle");
toggle.addEventListener("click", modeSwitch);

let isLight = true;

function modeSwitch() {
  isLight = !isLight;
  let root = document.body;
  
 isLight ? toggle.innerText = "dark" : toggle.innerText = "light";
  
  root.classList.toggle("lightMode");
}
