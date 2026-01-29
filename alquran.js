import {fetchingData, fetchingTitle} from "/main-quran/fetchingData.js";
import {
    hideTerjemah,
    showTerjemah,
    selectedAyat,
    loadTitleNext,
    show,
    seekBar,
    dropDown
} from "/main-quran/show.js";
import {audioPause, loadAudio, playAud} from "/main-quran/loadAudio.js";
//const API_TAFSIR = 'https://equran.id/api/v2/tafsir/'
let id = new URLSearchParams(window.location.search).get("id");
//let id = 2; //kontrol index surat
let indexGlobal = 0; //control index ayat
let audioUrl = [];
let lengthAyat = 0;
let objAyat;

const app = document.getElementById("app");
const audio = document.getElementById("audio");
const btnNext = document.getElementById("btn-next");
const titleNext = document.getElementById("btn-next");
const selectAyat = document.getElementById("select-ayat");
const titleOnChange = document.getElementById("drop-down-title");
const terjemah = document.getElementById("terjemah");
const toggle = document.querySelector("#toggle");
window.addEventListener("load", loadPage(id), false);

//dropdown list surat////////
window.addEventListener("DOMContentLoaded", async () => {
    const titleArray = await fetchingTitle();
    dropDown(titleArray);
    titleOnChange.value = id;
});
//render halaman awal --+--
async function loadPage(id) {
    const {data, ayat} = await fetchingData(id);
    objAyat = ayat;
    app.innerHTML = show(ayat);
    showTerjemah(objAyat);
    selectAyat.innerHTML = selectedAyat(ayat);
    titleNext.innerText = loadTitleNext(data);
    audioUrl = await loadAudio(ayat);
    lengthAyat = await (ayat.length - 1);
    let arabs = document.querySelectorAll(".arab");
    arabs.forEach((arab, i) => {
        arab.addEventListener("click", e => {
            indexGlobal = i;
            const element = arabs[indexGlobal];
            control(element, indexGlobal);
        });
    });
}
//audio Play/Pause
async function control(element, indexGlobal) {
    const audio = document.getElementById("audio");
    audio.src = audioUrl[indexGlobal];
    const playing = element.classList.contains("playing");
    playing ? audioPause(element, indexGlobal) : playAud(indexGlobal, element);
}

//seekBar footer setiap kali audio onPlay
audio.addEventListener("timeupdate", () => {
    seekBar();
});

//audio berakhir berlanjut ke ayat selanjutnya jika sudah ada di lastchild akan pindah ke surat selanjutnya-----
audio.addEventListener("ended", async () => {
    if (indexGlobal == lengthAyat) {
        id++;
        await loadPage(id);
        indexGlobal = 0;
        const arabs = document.querySelectorAll(".arab");
        const element = await arabs[indexGlobal];
        control(element, indexGlobal);
        titleOnChange.value = id;
    } else {
        const arabs = document.querySelectorAll(".arab");
        indexGlobal++;
        const element = arabs[indexGlobal];
        control(element, indexGlobal);
    }
});

//next button ke surat selanjutnya//
btnNext.addEventListener("click", () => {
    window.scrollTo({
        top: 80
    });
    id++;
    titleOnChange.value = id;
    titleOnChange.value = id;
    loadPage(id);
    document.getElementById("footer").style.visibility = "hidden";
    console.log(checkTerjemah);
    audio.pause();
});

//toggle darkLight
toggle.addEventListener("click", modeSwitch);
let isLight = true;

function modeSwitch() {
    isLight = !isLight;
    let root = document.body;

    isLight ? (toggle.innerText = "") : (toggle.innerText = "");

    root.classList.toggle("lightMode");
}

//tag Select list Surat (114) selected surat
titleOnChange.onchange = function () {
    id = this.value;
    titleOnChange.value = id;
    loadPage(id);
    const element = document.querySelectorAll(".arab")[indexGlobal];
    audioPause(element);
    window.scrollTo({
        top: 80
    });
};

//tag select list ayat; selected onPlay
selectAyat.onchange = function () {
    indexGlobal = Number(this.value) - 1;
    selectAyat.value = indexGlobal;
    const arabs = document.querySelectorAll(".arab");
    const element = arabs[indexGlobal];
    control(element, indexGlobal);
};

const btnTools = document.getElementById("btn-tools");
btnTools.addEventListener("click", () => {
    const btn = document.querySelector(".dropdown");
    btn.classList.toggle("active");
});

terjemah.addEventListener("click", () => {
    terjemah.checked ? showTerjemah(objAyat) : hideTerjemah();
});
