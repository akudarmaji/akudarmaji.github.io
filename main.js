const el = {
  modal: document.getElementById("box-model"),
  textModal: document.getElementById("text-modal"),
  close: document.getElementById("closes"),
  topBtn: document.getElementById("to-top-button"),
  smooth: { top: 0, behavior: "smooth" },
};

const Datas = {
  id: new URLSearchParams(window.location.search).get("id"),
  url: "https://quran-api-id.vercel.app/surahs/",
};

class Alquran {
  async fetching(url) {
    document.getElementById('app').innerHTML = ` <button id="to-top-button" title="Go To Top"
    class="fixed z-40 bottom-8 right-6 border-0 w-12 h-12 rounded-full drop-shadow-md bg-teal-100 bg-opacity-70 text-md font-lateef font-extrabold pointer-events-auto transition-all text-sm text-teal-600">
    <svg aria-hidden="true" class="w-12 h-12  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg></button>`
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

}
class Arabiyah extends Alquran{
  constructor({url,id}) {
    super()
    this.url = url
    this.id = id
  }
  async init() {
   await   this.fetching(this.url+this.id)
  }
  getTemplate() {
    let app = ``
    this.arab.forEach((e, i) => {
      app+= `<div class="app mb-1 bg-stone-100 hover:bg-stone-200 js-show-on-scroll ml-2 mr-2 bg-clip-padding backdrop-filter backdrop-blur-xl flex flex-row-reverse rounded-xl border-double  border-4 border-teal-100 p-4 shadow-xl text-gray-700 sm:p-6 lg:p-8 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none text-right text-2xl tracking-wider leading-relaxed font-lateef" data-id="${i}">
      <div class"" id="arab${i}">${e}</div>
      <button class="btn-tafsir border border-teal-300 absolute shadow-xl h-6  left-7 -top-3 rounded-md bg-teal-100 bg-opacity-40 px-2  text-sm text-teal-500 font-extralight" data-tafsir="${i}">Tafsir</button>
      <button class="btn-sub border border-teal-300 absolute shadow-xl h-6  right-7 -top-3 rounded-md bg-teal-100 bg-opacity-40 px-2  text-sm text-teal-500 font-extralight" data-sub="${i}">Sub</button>
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
        new Audio(audio[this.dataset.alafasy]).play()
      })
    })
  }
  getSub() {
    const btnSub = document.querySelectorAll('.btn-sub')
    btnSub.forEach((btn, i)  => {
      
      const sub = this.translation
      const arab = this.arab
      const juz = this.juz
      const page = this.page
      const inSurah = this.inSurah
      const inQuran = this.inQuran
      const divarab = document.getElementById(`arab${i}`)
      btn.addEventListener('click', function(e) {
        const id = this.dataset.sub
        if(divarab.innerHTML == arab[id]) {
          divarab.innerText = `${sub[id]}\nJuz ${juz[id]}, Hal ${page[id]}, Nomor Surat ${inSurah[id]}, Nomor Ayat ${inQuran[id]}`
          divarab.classList.add('text-sm','text-justify','leading-5')
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
        const id = this.dataset.tafsir
        el.modal.classList.remove('invisible')
        el.textModal.innerText = `QURAISH \n${quraish[id]}\nKEMENAG\n${kemenag[id]}`
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
  arabiyah.getTemplate()
  arabiyah.getAudio()
  arabiyah.getSub()
  arabiyah.getTafsir()
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
