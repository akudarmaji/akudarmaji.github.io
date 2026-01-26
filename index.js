import {fetchingData, fetchingTitle} from "/main-quran/fetchingData.js";
import {
    selectedAyat,
    loadTitleNext,
    show,
    seekBar,
    dropDown
} from "/main-quran/show.js";
import {audioPause, loadAudio, playAud} from "/main-quran/loadAudio.js";
//const API_TAFSIR = 'https://equran.id/api/v2/tafsir/'
//let id = new URLSearchParams(window.location.search).get("id");
let id = 1;
let indexGlobal = 0;
let audioUrl = [];
let lengthAyat = 0;

const app = document.getElementById("app");
const titleNext = document.getElementById("btn-next");
const selectAyat = document.getElementById("select-ayat");
const titleOnChange = document.getElementById("drop-down-title");
window.addEventListener("load", loadPage(id), false);
window.addEventListener("DOMContentLoaded", async () => {
    const titleArray = await fetchingTitle();
    dropDown(titleArray);
    titleOnChange.value = id;
});
async function loadPage(id) {
    const {data, ayat} = await fetchingData(id);
    app.innerHTML = show(ayat);
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

async function control(element, indexGlobal) {
    const audio = document.getElementById("audio");
    audio.src = audioUrl[indexGlobal];
    const playing = element.classList.contains("playing");
    playing ? audioPause(element, indexGlobal) : playAud(indexGlobal, element);
}

const audio = document.getElementById("audio");
audio.addEventListener("timeupdate", () => {
    seekBar();
});
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

const btnNext = document.getElementById("btn-next");
btnNext.addEventListener("click", () => {
    window.scrollTo({
        top: 0
    });
    id++;
    const titleOnChange = document.getElementById("drop-down-title");
    titleOnChange.value = id;
    titleOnChange.value = id;
    loadPage(id);
    document.getElementById("footer").style.visibility = "hidden";
    const audio = document.getElementById("audio");
    audio.pause();
});


const toggle = document.querySelector("#toggle");
toggle.addEventListener("click", modeSwitch);

let isLight = true;

function modeSwitch() {
    isLight = !isLight;
    let root = document.body;

    isLight ? (toggle.innerText = "Light") : (toggle.innerText = "Dark");

    root.classList.toggle("lightMode");
}

titleOnChange.onchange = function () {
    id = this.value;
    titleOnChange.value = id;
    loadPage(id);
    const element = document.querySelectorAll(".arab")[indexGlobal];
    audioPause(element);
    window.scrollTo({
        top: 0
    });
};

selectAyat.onchange = function () {
    indexGlobal = Number(this.value) - 1;
    selectAyat.value = indexGlobal;
    const arabs = document.querySelectorAll(".arab");
    const element = arabs[indexGlobal];
    control(element, indexGlobal);
};
