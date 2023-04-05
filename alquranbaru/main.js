const el = {
  app: document.getElementById("app"),
  audioAlafasy: document.getElementById("audio-alafasy"),
};

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
        container += template(arab, alafasy, translation);
      }
    );
    el.app.innerHTML = container;
    const btnAudio = document.querySelectorAll(".btn-audio");
    btnAudio.forEach((btn) => {
      btn.addEventListener("click", function () {
        el.audioAlafasy.setAttribute("src", this.dataset.alafasy);
      });
    });
  }
}

function template(arab, alafasy, translation) {
  return `<div class="m-1 bg-stone-100 hover:bg-stone-200 js-show-on-scroll ml-2 mr-2 bg-clip-padding backdrop-filter backdrop-blur-xl flex justify-end rounded-xl border-double  border-4 border-teal-100 p-4 shadow-xl text-gray-700 sm:p-6 lg:p-8 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none text-right text-2xl tracking-wider leading-relaxed font-lateef">${arab}

             <button class="border border-teal-300 absolute z-10 shadow-xl h-6 right-8 -top-3 rounded-md bg-teal-100 bg-opacity-40 px-2  text-sm text-teal-500 font-extralight" data-alafasy="${alafasy}">Tafsir</button>
             <button class="btn-audio border border-teal-300 absolute z-10 shadow-xl h-6  -right-2 -top-3 rounded-md bg-teal-100 bg-opacity-40 px-2  text-sm text-teal-500 font-extralight" data-alafasy="${alafasy}">♬°</button>
               </div>`;
}

const alquran = new Alquran();
alquran.getQuran(Datas, el);
