  const id1=  new URLSearchParams(window.location.search).get("id");
  const id ="6";
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
    const nama = document.getElementById('nama');
    nama.innerText = `${data.namaLatin}|${data.nama}`;
    
    for (let i = 0; i < ayat.length; i++) {
      const listArab = document.createElement('li');
      const listLatin = document.createElement('li');
      const listTerjemah = document.createElement('li');
      listArab.setAttribute('class','list-arab');
    listLatin.setAttribute('class',`list-latin`);
    listTerjemah.setAttribute('class','list-terjemah');
    
    
      const dataLatin = data.ayat[i].teksLatin;
      const noAyat = ayat[i].nomorAyat;
      const dataTerjemah = ayat[i].teksIndonesia;
      
      listArab.textContent =` ${data.ayat[i].teksArab}`;
      listLatin.textContent = `${dataLatin}`;
      listTerjemah.textContent = `${dataTerjemah}`
      
      

  const ul = document.getElementById('ayat')
  ul.appendChild(listLatin);
  ul.appendChild(listTerjemah);
  ul.appendChild(listArab);
    } 
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
  
  function showLatin() {
    const latinCheckbox = document.getElementById('latin')
    const latin = document.getElementsByClassName('list-latin')
  if(latinCheckbox.checked){
    for (let a of latin) {
      a.style.display = 'block'
    }
  } else {
    for (let a of latin) {
      a.style.display = 'none'
    }
  }
  } 
  
  
  function showTerjemah() {
    const terjemahCheckbox = document.getElementById('terjemah');
    const terjemah = document.getElementsByClassName('list-terjemah')
    if(terjemahCheckbox.checked) {
      for (let a of terjemah) {
        a.style.display = 'block'
}
    }else {
      for (let a of terjemah) {
        a.style.display = 'none';
    }
  }
 }
  
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

    fetchPosts()