import {
    fetchingTafsir,
    fetchingData,
    fetchingTitle
} from "/main-quran/fetchingData.js";
import {
    hideTafsir,
    showTafsir,
    hideTerjemah,
    showTerjemah,
    selectedAyat,
    show,
    seekBar,
    dropDown
} from "/main-quran/show.js";
import {audioPause, loadAudio, playAud} from "/main-quran/loadAudio.js";
//const API_TAFSIR = 'https://equran.id/api/v2/tafsir/'
//let id = new URLSearchParams(window.location.search).get("id");
let id = 1; //kontrol index surat
let indexGlobal = 0; //control index ayat
let audioUrl = [];
let lengthAyat = 0;
let objAyat;
let arrTafsir;

const app = document.getElementById("app");
const audio = document.getElementById("audio");
const selectAyat = document.getElementById("select-ayat");
const titleOnChange = document.getElementById("drop-down-title");
const btnTools = document.getElementById("btn-tools");
const terjemah = document.getElementById("terjemah");
const tafsir = document.getElementById("tafsir");
const toggle = document.querySelector("#toggle");

window.addEventListener("load", () => {
    id = localStorage.idSurat ? localStorage.idSurat : 1;
loadPage(id)
});
window.onscroll = () => {
    const btn = document.querySelector(".dropdown");
    btn.classList.remove("active");
};
//dropdown list surat////////
window.addEventListener("DOMContentLoaded", async () => {
    const titleArray = await fetchingTitle();
    dropDown(titleArray);
    titleOnChange.value = localStorage.idSurat ? localStorage.idSurat : id;
    indexGlobal = Number(localStorage.idAyat);
    selectAyat.value = Number(localStorage.idAyat) + 1;
    const arabs = document.querySelectorAll(".arab");
    const element = arabs[indexGlobal];
    control(element, indexGlobal);
});
//render halaman awal --+--
export async function loadPage(id) {
    const {data, ayat} = await fetchingData(id);
    objAyat = ayat;
    app.innerHTML = show(ayat);
    selectAyat.innerHTML = selectedAyat(ayat);
    audioUrl = await loadAudio(ayat);
    lengthAyat = await (ayat.length - 1);
    terjemah.checked ? showTerjemah(objAyat) : hideTerjemah();
    arrTafsir = await fetchingTafsir(id);
    tafsir.checked = false;
    let arabs = document.querySelectorAll(".arab");
    arabs.forEach((arab, i) => {
        arab.addEventListener("click", e => {
            indexGlobal = i;
            localStorage.setItem("idSurat", id);
            localStorage.setItem("idAyat", indexGlobal);
            const element = arabs[indexGlobal];
            control(element, indexGlobal);
        });
    });
    const humbers = document.querySelectorAll("#humber");
    humbers.forEach(humber => {
        humber.addEventListener("click", e => {
            const idAyat = e.target.parentElement.id;
            localStorage.setItem("idAyat", idAyat);
            localStorage.setItem("idSurat", id);
            alert("bookmark tersimpan");
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
audio.addEventListener("timeupdate", seekBar);
//audio berakhir berlanjut ke ayat selanjutnya jika sudah ada di lastchild akan pindah ke surat selanjutnya-----
audio.addEventListener("ended", async () => {
    if (indexGlobal == lengthAyat) {
        id++;

        await loadPage(id);
        indexGlobal = 0;
        localStorage.setItem("idSurat", id);
        localStorage.setItem("idAyat", indexGlobal);
        const arabs = document.querySelectorAll(".arab");
        const element = await arabs[indexGlobal];
        control(element, indexGlobal);
        titleOnChange.value = id;
    } else {
        const arabs = document.querySelectorAll(".arab");
        indexGlobal++;
        localStorage.setItem("idAyat", indexGlobal);
        const element = arabs[indexGlobal];
        control(element, indexGlobal);
    }
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
    const loading = document.querySelector(".loader");
    loading.style.display = "block";
    id = this.value;
    titleOnChange.value = id;
    localStorage.setItem("idSurat", id);
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
    localStorage.setItem("idAyat", indexGlobal);
    const arabs = document.querySelectorAll(".arab");
    const element = arabs[indexGlobal];
    control(element, indexGlobal);
};

btnTools.addEventListener("click", () => {
    const btn = document.querySelector(".dropdown");
    btn.classList.toggle("active");
});

terjemah.addEventListener("click", () => {
    terjemah.checked ? showTerjemah(objAyat) : hideTerjemah();
});
tafsir.addEventListener("click", () => {
    tafsir.checked ? showTafsir(arrTafsir) : hideTafsir();
});
