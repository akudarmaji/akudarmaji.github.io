  const id=  new URLSearchParams(window.location.search).get("id");
    const API_URL = 'https://equran.id/api/v2/surat/'
    // baseURL cadangan
    // const API_URL = `https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=` 

  async function fetchPosts() {
    const response = await fetch(`${API_URL}${id}`)
    let data = await response.json()
    if (response) {
      hideloader();
    }
    show(data)
    functionDC(data)
  }

  function hideloader() {
    document.getElementById('loading').innerText = 'none';
    document.getElementById('loading').innerHTML = `<h1>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>`
}


  function show({data}) {
    const ayat = data.ayat;
    for (let i = 0; i < ayat.length; i++) {
      const listItem = document.createElement('li');
      const teksContentLatin = document.createElement('div');
           teksContentLatin.className = i;
      const teksLatin = data.ayat[i].teksLatin;
      teksContentLatin.textContent = teksLatin
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
    const audio = Object.values(data.ayat[i].audio)
    play = new Audio(audio[0]).play()
    
  }
}
  }
  function functionDC () {
    
  }

  const hideTerjemah = () =>{
    document.getElementById('nav').style.display = 'none';
  }

    fetchPosts()
