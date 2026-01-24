import {fetchingData} from '/main-quran/fetchingData.js';
import {loadAudio} from '/main-quran/loadAudio.js';


export function show(ayats) {
  let content = '';
  for (var i = 0; i < ayats.length; i++) {
  content += `
      <div class="card">
        <h3 class="arab">${ayats[i].teksArab}</h3>
        <div id="list-menu">
        <i id="humber" class="fa-solid fa-ellipsis"></i>
        <div id="list"></div>
        </div>
      </div>`;
  }
  return content;
}

export function seekBar() {
  var audio = document.getElementById('audio')
const currentTime = audio.currentTime;
const durasi = audio.duration;
const progressBar = document.getElementById('myRange');
progressBar.addEventListener('change',()=>{
  audio.currentTime = progressBar.value;
})
progressBar.max = durasi;
progressBar.value = currentTime;
}

