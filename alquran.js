
  const id = new URLSearchParams(window.location.search).get("id")
  let tafsirnya = [];
const ula = document.getElementById('ayat');
const audio =document.getElementById('audio');
  let musicIndex = [];

  window.onload = ()=> {
    checkbox.checked =true
     latinCheckbox.checked = true;
     terjemahCheckbox.checked = true;
     toolsCheckbox.checked = true;
  }
  const API_TAFSIR = 'https://equran.id/api/v2/tafsir/'
  const API_URL = 'https://equran.id/api/v2/surat/'

  async function fetchPosts(id) {
    const response = await fetch(`${API_URL}${id}`)
    let data = await response.json()
    const response2 = await fetch(`${API_TAFSIR}${id}`)
    let tafsir = await response2.json()
    const tafsir2 = tafsir.data.tafsir;

    if (response.ok) {
      show(data,tafsir2);
      document.getElementById('loading').style.display = 'none'
        
    }
  }
    
  function show({data},tafsir) {
   // const previus = data.suratSebelumnya.nomor
    const {ayat, nama, nomor, namaLatin,jumlahAyat, arti} = data;
    const judul = document.getElementById('nama')
    judul.innerText = nama
    const descHeader = document.getElementById('arti');
descHeader.innerText = `${nomor} | ${namaLatin} | ${arti} | ${jumlahAyat} ayat`
  
  for (let i = 0; i < ayat.length; i++) {
    const url = ayat[i].audio
    const audioURL = Object.values(url)[0]
    
      musicIndex.push(audioURL);
      tafsirnya.push(tafsir[i].teks)
  const noAyat = ayat[i].nomorAyat;
  const number = new Intl.NumberFormat('ar-EG').format(noAyat)
    
  const liTagAll = `<li li-index=${i} class="li-container">
    <div class="tools-container">
  <div onclick="desc(this)" id="${noAyat}" class="tools1">${noAyat}</div>
  <div id="tool" class="tools2"></div>
  <div id="tool" class="tools3"></div>
</div>
      <p class='latin'>${ayat[i].teksLatin}</p>
      <p class='terjemah'>${ayat[i].teksIndonesia}</p>
      <h1 class='arab'>${ayat[i].teksArab}
      </h1>
      </li>`;
    ula.insertAdjacentHTML('beforeend', liTagAll);
    } 
  }


let seekbar = document.createElement('input');
seekbar.setAttribute('class', 'seek-bar')
seekbar.setAttribute('type', 'range')

ula.addEventListener('click', (e) => {
  const seekBars = ula.querySelectorAll('h1 input')
  const parent = e.target.parentElement
  const index = parent.getAttribute('li-index');
    audio.src = musicIndex[index]

  const lists = document.querySelectorAll('h1.arab');
    lists.forEach((list)=> {
      list.classList.remove('hover')
    })
  setTimeout(()=> {
    if(audio.duration = NaN) {
    seekbar.style.display ='none'
    }else {
      seekbar.max = Math.round(audio.duration)
    }
  },500)
  setInterval(()=>{
    if(seekbar.value = undefined) {
      seekbar.style.display ='none'
    }else {
      seekbar.value = audio.currentTime;
    }
},100)

  seekbar.addEventListener('change',()=>{
    audio.currentTime = seekbar.value
  })
 
  const arab = e.target.className == 'arab'
    arab ? active(e):stop(e);
    
  })
  
  function active(e) {
    e.target.appendChild(seekbar)
    e.target.classList.add('hover')
    audio.play()
  }
  function stop(e) {
  e.target.classList.remove('hover')
  }
  
  
  window.onscroll = function() {scrollFunction()
  };

  function scrollFunction() {
  percentageVal = document.querySelector("#percentage-value")
  bodyHeight = document.body.offsetHeight
  const heightOfWindow = window.innerHeight
contentScrolled = window.pageYOffset;

  const total = bodyHeight - heightOfWindow,
  got = contentScrolled,
  percent = parseInt((got / total) * 100)
  const ball = document.getElementById("ball");
ball.textContent = `${percent}`;
}



  const checkbox = document.getElementById("checkbox")
  document.body.classList.add('dark')
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})
  
const latinCheckbox = document.getElementById('latin-checkbox');
  const listLatin = document.getElementsByClassName('latin');
  latinCheckbox.addEventListener('change',()=>{
    for (let a of listLatin) {
      a.classList.toggle('hide');
    }
  })
 
  
  
  const terjemahCheckbox = document.getElementById('checkbox-terjemah');
  const listTerjemah = document.getElementsByClassName('terjemah');
  terjemahCheckbox.addEventListener('change',()=>{
    for (let a of listTerjemah) {
      a.classList.toggle('hide');
    }
  })
  
 const toolsCheckbox = document.getElementById('tools');
const listTools = document.getElementsByClassName('tools-container');
toolsCheckbox.addEventListener('change', () => {
  for (let a of listTools) {
    a.classList.toggle('hide');
  }
})

 const desc = function (e) {
  e.classList.toggle('desc')
  const id = e.getAttribute('id')
  const teksContoh  = tafsirnya[id-1]
  let teks = e.innerText
  e.innerText = teks == id ? teksContoh : id;
  
  
 }

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

    fetchPosts(id)
