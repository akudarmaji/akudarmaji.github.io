const el = {
  app: document.getElementById("app"),
  audioAlafasy: document.getElementById("audio-alafasy"),
  ayat: document.getElementById("p-ayat"),
  modal: document.getElementById("box-model"),
  textModal: document.getElementById("text-modal"),
  close: document.getElementById("closes"),
  topBtn: document.getElementById("to-top-button"),
};

const scrolling = {
  smooth: { top: 0, behavior: "smooth" },
}

const Datas = {
  id: new URLSearchParams(window.location.search).get("id"),
  url: "https://quran-api-id.vercel.app/surahs/",
};

class Alquran {
  async getQuran({ url, id }) {
    let container = "";
    const { number, numberOfAyahs, ayahs } = await (
      await fetch(url + id)
    ).json();
    ayahs.forEach(
      (
        {
          arab,
          translation,
          audio: { alafasy },
          number: { inQuran, inSurah },
          tafsir: { quraish, kemenag },
        },
        i
      ) => {
        container += template(arab, alafasy, translation, quraish);
      }
    );
    el.app.innerHTML = container;
    const btnAudio = document.querySelectorAll(".btn-audio");
    btnAudio.forEach((btn) => {
      btn.addEventListener("click", function () {
        new Audio(this.dataset.alafasy).play()
      });
    });
    const btnTafsir = document.querySelectorAll('.btn-tafsir')
    btnTafsir.forEach(btn => {
      btn.addEventListener('click', function() {
        el.modal.scrollTo(scrolling.smooth);
        el.modal.classList.remove('invisible')
        el.textModal.innerText = this.dataset.tafsir
      })
    })
    const btnSub = document.querySelectorAll('.btn-sub')
    btnSub.forEach(btn => {
      btn.addEventListener('click', function() {
        el.modal.scrollTo(scrolling.smooth);
        el.modal.classList.remove('invisible')
        el.textModal.innerText = this.dataset.sub
      })
    })
  }
}

function template(arab, alafasy, translation, quraish) {
  return `<div class="mb-1 bg-stone-100 hover:bg-stone-200 js-show-on-scroll ml-2 mr-2 bg-clip-padding backdrop-filter backdrop-blur-xl flex flex-row-reverse rounded-xl border-double  border-4 border-teal-100 p-4 shadow-xl text-gray-700 sm:p-6 lg:p-8 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none text-right text-2xl tracking-wider leading-relaxed font-lateef">${arab}

             <button class="btn-tafsir border border-teal-300 absolute shadow-xl h-6 left-0 -top-3 rounded-md bg-teal-100 bg-opacity-40 px-2  text-sm text-teal-500 font-extralight" data-tafsir="${quraish}">Tafsir</button>
             <button class="btn-sub border border-teal-300 absolute shadow-xl h-6  right-7 -top-3 rounded-md bg-teal-100 bg-opacity-40 px-2  text-sm text-teal-500 font-extralight" data-sub="${translation}">Sub</button>
             <button class="btn-audio border border-teal-300 absolute shadow-xl h-6  -right-2 -top-3 rounded-md bg-teal-100 bg-opacity-40  px-2 text-sm text-teal-500 font-extralight" data-alafasy="${alafasy}">♬°</button>
               </div>`;
}


function closes() {
  el.modal.classList.add('invisible')
}

window.onload = () => {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
  document.documentElement.scrollTo(scrolling.smooth);
};

window.onscroll = function() {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = Math.round((scrollTop / scrollHeight) * 100);
  el.topBtn.innerText = scrolled + "%";
  if (scrolled == 100 || scrolled == 0) {
    el.topBtn.classList.add("translate-y-12");
  } else {
    el.topBtn.classList.remove("translate-y-12");
  }
}

const alquran = new Alquran();
alquran.getQuran(Datas, el);
