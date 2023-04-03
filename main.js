let id = new URLSearchParams(window.location.search);
let index = id.get('id')
let btnBackTop = document.getElementById('to-top-button')
let backTop = document.getElementById('to-top-button')
backTop.addEventListener('click', () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
})


class Alquran {
  constructor(index = 1) {
    this.ayat = fetch(`https://quran-api-id.vercel.app/surahs/${index}`)
      .then((response) => response.json())
      .then(({ ayahs }) => {
        template(ayahs);

        this.btnAudio = document.querySelectorAll(".btn-audio");
        // this.audio = document.querySelectorAll("#audio");
        this.btnAudio.forEach((btn) => {
          btn.addEventListener("click", function () {
            this.id = this.dataset.id;
            this.audio = new Audio(ayahs[this.id].audio.alafasy);
            this.audio.play();
          });
        });

        this.btnTafsir = document.querySelectorAll(".btn-tafsir");
        this.btnTafsir.forEach((btn) => {
          btn.addEventListener("click", function () {
            this.id = this.dataset.id;
            this.text = document.getElementById("text-tafsir");
            this.pTafsiran = document.getElementById("pTafsiran");
            this.pTafsiran.scrollTo({ top: 0, behavior: "smooth" });
            this.text.innerText = ayahs[this.id].tafsir.quraish;
            this.textTitle = document.getElementById("pAyat");
            this.textTitle.innerHTML = `Juz ${
              ayahs[this.id].meta.juz
            }, Nomor Ayat ${ayahs[this.id].number.inQuran}, Halaman ${
              ayahs[this.id].meta.page
            }`;

            document.getElementById("box-model").classList.remove("invisible");
            document
              .getElementById("closes")
              .addEventListener("click", function () {
                document.getElementById("box-model").classList.add("invisible");
              });
          });
        });

        this.btn = document.querySelectorAll(".btn-terjemah");
        this.btn.forEach((btn) => {
          btn.addEventListener("click", function () {
            this.id = this.dataset.id;
            Telegram.WebApp.showPopup({
              // title: "Popup title",
              message: `${ayahs[this.id].translation}`,
              buttons: [{ type: "close" }],
            });
          });
        });
      });
  }
  progress() {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrolled = Math.round((scrollTop / scrollHeight)*100)
    btnBackTop.innerText = scrolled+'%'
    if(scrolled >1) {
      btnBackTop.classList.remove('hidden')
    }else {
      btnBackTop.classList.add('hidden')
    }
  }
}

window.onload = () => {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
};







document.onreadystatechange = () => {
  if(document.readyState === "complete") {
    btnBackTop.classList.add('hidden')
  }
  
}

function template(ayahs) {
  let arab = "";
  for (let i = 0; i < ayahs.length; i++) {
    arab += ` <button class="btn-audio relative z-10 shadow-xl h-6 w-15 -right-0 top-2 rounded-md bg-teal-100 px-2 py-1.5 text-xs font-sm text-teal-500 font-bold" data-id="${i}">♬°</button>
    <button class="btn-tafsir relative z-10 shadow-xl h-6 w-15 -right-0 top-2 rounded-md bg-teal-100 px-2 py-1.5 text-xs font-sm text-teal-500 font-bold" data-id="${i}">Ayat ${ayahs[i].number.inSurah}</button>
    <div class="btn-terjemah hover:bg-white js-show-on-scroll ml-2 mr-2 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 tracking-wider relative flex  justify-end rounded-xl border border-gray-100 p-4 shadow-xl text-gray-400 sm:p-6 lg:p-8 transition transform hover:text-black hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none text-center text-4xl tracking-normal font-lateef" data-id="${i}">
    <p class="">${ayahs[i].arab}</p>
   </div>`;
  }
  return (document.getElementById("container").innerHTML = arab);
}



let surah = new Alquran(index);
window.onscroll = function(){surah.progress()}

