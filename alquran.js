  const id1=  new URLSearchParams(window.location.search).get("id");
  const id ="80";
    const API_URL = 'https://equran.id/api/v2/surat/'
    // baseURL cadangan
    // const API_URL = `https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=` 

  async function fetchPosts() {
    const response = await fetch(`${API_URL}${id}`)
    let data = await response.json()
    if (response.ok) {
        hideloader(data);
    }
    
  }
  
  function hideloader(data) {
    document.getElementById('loading').style.display = 'none'
      show(data);
    }


  function show({data}) {
    const ayat = data.ayat;
    for (let i = 0; i < ayat.length; i++) {
      const listItem = document.createElement('li');
      const teksContentLatin = document.createElement('div');
           teksContentLatin.className = i;
      const teksLatin = data.ayat[i].teksLatin;
      const noAyat = ayat[i].nomorAyat;
      teksContentLatin.textContent = `${noAyat}. ${teksLatin}`
      listItem.id = i;
      listItem.textContent =` ${data.ayat[i].teksArab}`;
      listItem.setAttribute('ondblclick', 'functionDC()')

  const ul = document.getElementById('ayat')
  ul.appendChild(teksContentLatin)
  ul.appendChild(listItem);
    } 



// const API_URL_TERJEMAH = `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/id/${id}.json`;


    let tangkapSemuaList = document.getElementsByTagName('li');
for (let i = 0; i < tangkapSemuaList.length; i++) {
  var list = tangkapSemuaList[i];
      list.onclick = function() {
    const nav = document.getElementById('nav');
    nav.style.display = 'block';
    nav.innerText = data.ayat[i].teksIndonesia;
    document.getElementById(i).style.color = 'red';
    setTimeout(() => {
    document.getElementById(i).style.color = '#4d918f';
    }, 800);

  };
  list.ondblclick = function() {
    const audioURL = Object.values(data.ayat[i].audio)
    const audio = new Audio(audioURL[0]).play()
  }
}
  }
  function functionDC () {
    
  }

  const hideTerjemah = () =>{
    document.getElementById('nav').style.display = 'none';
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
//percentageVal.textContent = `${percent}%`;
  const persen = document.getElementById("percentage-value");
  if(percent < 99) {
    percentageVal.textContent = `${percent}%`;
    persen.style.animationName = 'animate-width';
    persen.style.width = '40px'
  } else if (percent >96) {
   persen.style.animationName = 'animate-open';
   persen.style.width = '200px';
   setTimeout(() => {
     persen.innerText = "صَدَقَ اللهُ اْلعَظِيْمُ"
   },500)
  } else {
    
  } {
    
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

    fetchPosts()