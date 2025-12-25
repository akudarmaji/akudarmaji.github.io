const ula = document.getElementById('ayat');
const audio =document.getElementById('audio');
  let musicIndex = [];
  musicDurations = {}

  window.onload = ()=> {
     latinCheckbox.checked = true;
     terjemahCheckbox.checked = true;
     toolsCheckbox.checked = true;
  }
  
  const id=  new URLSearchParams(window.location.search).get("id");
  const API_URL = 'https://equran.id/api/v2/surat/'

  async function fetchPosts() {
    const response = await fetch(`${API_URL}${id}`)
    let data = await response.json()
    if (response.ok) {
      show(data);
      document.getElementById('loading').style.display = 'none'
        
    }
  }
    
  function show({data}) {
    const nama = data.nama
    const nomor = data.nomor
    const namaLatin = data.namaLatin
    const jumlahAyat = data.jumlahAyat
    const ayat = data.ayat;
    const arti = data.arti
    const judul = document.getElementById('nama')
    judul.innerText = nama
    const descHeader = document.getElementById('arti');
descHeader.innerText = `${nomor} | ${namaLatin} | ${arti} | ${jumlahAyat} ayat`
    
  for (let i = 0; i < ayat.length; i++) {
    const url = ayat[i].audio
    const audioURL = Object.values(url)[0]
    
      musicIndex.push(audioURL);
  const noAyat = ayat[i].nomorAyat;
  const number = new Intl.NumberFormat('ar-EG').format(noAyat)
    
  const liTagAll = `<li li-index=${i} class="li-container">
      <p class='latin'>${ayat[i].teksLatin}</p>
      <p class='terjemah'>${ayat[i].teksIndonesia}</p>
      <h1 class='arab'>${ayat[i].teksArab}
      </h1>
  <div class="tools-container">
  <div id="tool" class="tools1">${number}</div>
  <div id="tool" class="tools2"></div>
  <div id="tool" class="tools3"></div>
</div>
      </li>`;
    ula.insertAdjacentHTML('beforeend', liTagAll);
    } 
  }


let seekbar = document.createElement('input');
seekbar.setAttribute('class','seek-bar')
seekbar.setAttribute('type','range')
seekbar.setAttribute('value','0')


ula.addEventListener('click', (e) => {
  const seekBars = ula.querySelectorAll('h1 input')
  const parent = e.target.parentElement
  const index = parent.getAttribute('li-index');
    audio.src = musicIndex[index]

  const lists = document.querySelectorAll('h1.arab');
 
    lists.forEach((list,index)=> {
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
},500)
  seekbar.addEventListener('change',()=>{
    audio.currentTime = seekbar.value
  })
 
  const arab = e.target.className == 'arab'
    arab ? active(e) : stop(e);
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
  
 
 
  function tools() {
  const toolsCheckbox = document.getElementById('tools')
  const toolsContainer = document.getElementsByClassName('tools-container');
  if(toolsCheckbox.checked) {
    for (let a of toolsContainer) {
        a.style.display = 'flex'
}
  }else {
        for (let a of toolsContainer) {
      a.style.display = 'none'
    }
  }
}






function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

    fetchPosts()
