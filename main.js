const WebApp = {
  ready: Telegram.WebApp.ready(),
  expand: Telegram.WebApp.expand(),
  close: Telegram.WebApp.expand()
}

const el = {
  container:document.querySelector(".container"),
  modal: document.getElementById("box-model"),
  textModal: document.getElementById("text-modal"),
  close: document.getElementById("closes"),
  topBtn: document.getElementById("to-top-button"),
  smooth: { top: 0, behavior: "smooth" },
  divTafsir: document.getElementById('tafsiran')
};

const Datas = {
  id: new URLSearchParams(window.location.search).get("id"),
  url: "https://quran-api-id.vercel.app/surahs/",
  url2: "https://al-quran-8d642.firebaseio.com/surat/"
};

class Alquran {
  async fetching(url) {
    const {ayahs} = await (await fetch(url)).json()
    this.audio = []
    this.arab = []
    this.translation = []
    this.kemenag = []
    this.quraish = []
    this.juz = []
    this.page = []
    this.inSurah = []
    this.inQuran = []
    ayahs.forEach(({arab,audio:{alafasy},tafsir:{kemenag:{long},quraish},meta:{juz,page},number:{inSurah,inQuran},translation}) => {
      this.arab.push(arab)
      this.audio.push(alafasy)
      this.translation.push(translation)
      this.kemenag.push(long)
      this.quraish.push(quraish)
      this.juz.push(juz)
      this.page.push(page)
      this.inSurah.push(inSurah)
      this.inQuran.push(inQuran)
    })
   
  }
  async fetching2(url) {
    const alfabet = await(await fetch(url)).json()
    this.tr = []
    alfabet.forEach(({tr}) => {
    this.tr.push(tr)
    })
  }

}
class Arabiyah extends Alquran{
  constructor({url, url2,id}) {
    super()
    this.url2 = url2
    this.url = url
    this.id = id
  }
  async init() {
   await   this.fetching(this.url+this.id)
    await this.fetching2(this.url2+this.id+'.json')
  }
  getTemplate() {
    let app = ``
    this.arab.forEach((e, i) => {
      app+= `<div class="app mb-1 bg-stone-100 hover:bg-stone-200 js-show-on-scroll ml-2 mr-2 bg-clip-padding backdrop-filter backdrop-blur-xl flex flex-row-reverse rounded-xl border-double  border-4 border-teal-100 p-4 shadow-xl text-gray-700 sm:p-6 lg:p-8 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none text-right text-2xl tracking-wider leading-relaxed font-lateef" data-id="${i}">
      <div class"" id="arab${i}">${e}</div>
      <button class="btn-tafsir border border-teal-300 absolute shadow-xl h-6  left-6 -top-3 rounded-md bg-teal-100 bg-opacity-40 px-1  text-sm text-teal-500 font-extralight" data-tafsir="${i}">Tafsir</button>
      <button class="btn-sub border border-teal-300 absolute shadow-xl h-6  -left-1 -top-3 rounded-md bg-teal-100 bg-opacity-40 px-1  text-sm text-teal-500 font-extralight" data-sub="${i}">🔄</button>
      <button class="btn-details border border-teal-300 absolute shadow-xl h-6 right-7  -top-3 rounded-md bg-teal-100 bg-opacity-40  px-1 text-sm text-teal-500 font-extralight" data-id="${i}">ℹ️</button>
             <button class="btn-audio border border-teal-300 absolute shadow-xl h-6  -right-2 -top-3 rounded-md bg-teal-100 bg-opacity-40  px-2 text-sm text-teal-500 font-extralight" data-alafasy="${i}">♬°</button>
        </div>`
    })
    document.getElementById('app').innerHTML = app
  }
  getAudio() {
    const btnAudio = document.querySelectorAll('.btn-audio')
    btnAudio.forEach(btn  => {
      const audio = this.audio
      btn.addEventListener('click', function() {
        const audioPlay = new Audio(audio[this.dataset.alafasy])
        audioPlay.play()
      })
    })
  }
  getSub() {
    const btnSub = document.querySelectorAll('.btn-sub')
    btnSub.forEach((btn, i)  => {
      const alfa = this.tr
      const sub = this.translation
      const arab = this.arab
      const divarab = document.getElementById(`arab${i}`)
      btn.addEventListener('click', function(e) {
        const id = this.dataset.sub
        if(divarab.innerHTML == arab[id]) {
          divarab.innerText = sub[id]
          divarab.classList.add('text-sm','text-justify','leading-5')
        } else if(divarab.innerHTML == sub[id]) {
          divarab.innerHTML = alfa[id]
        }else {
          divarab.innerText = arab[id]
          divarab.classList.remove('text-sm','text-justify','leading-5')
        }
 
      })
    })
  }
  getTafsir() {
    const btnTaf = document.querySelectorAll('.btn-tafsir')
    btnTaf.forEach(btn  => {
      const kemenag = this.kemenag
      const quraish = this.quraish
      btn.addEventListener('click', function() {
        el.divTafsir.scrollTo(el.smooth)
        const id = this.dataset.tafsir
        el.modal.classList.remove('invisible')
        el.textModal.innerText = `QURAISH \n${quraish[id]}\nKEMENAG\n${kemenag[id]}`
      })
    })
  }
  getPopUp() {
    const details = document.querySelectorAll('.btn-details')
    const juz = this.juz
    const page = this.page
    const inSurah = this.inSurah
    const inQuran = this.inQuran
    details.forEach((btn) => {
      btn.addEventListener('click', function() {
        const id = this.dataset.id
        Telegram.WebApp.showPopup({
          title: `JUZ ${juz[id]}`,
                message: `alquran halaman ${page[id]}\nnomor ayat ${inSurah[id]} pada surat ini\nnomor ayat ${inQuran[id]} pada total keseluruhan`,
        })
      })
    })
  }

  closes() {
    el.modal.classList.add('invisible')
  }
  backToTop() {
    document.documentElement.scrollTo(el.smooth)
  }
}

const arabiyah = new Arabiyah(Datas)
arabiyah.init().then(() => {
  WebApp.ready
  WebApp.expand
  arabiyah.getTemplate()
  arabiyah.getAudio()
  arabiyah.getSub()
  arabiyah.getTafsir()
  arabiyah.getPopUp()
})

window.onscroll = function() {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = Math.round((scrollTop / scrollHeight) * 100);
  el.topBtn.innerText = scrolled + "%";
  if (scrolled == 100) {
    el.topBtn.classList.add("translate-y-12");
  } else {
    el.topBtn.classList.remove("translate-y-12");
  }
}


window.onload = () => {
  WebApp.ready
  WebApp.expand
  document.documentElement.scrollTo(el.smooth);
};
