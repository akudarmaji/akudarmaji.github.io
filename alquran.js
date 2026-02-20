import {
    fetchingTafsir,
    fetchingData,
    loadMore
} from "/main-quran/fetchingData.js";
import {selectedAyat, show, seekBar, dropDown} from "/main-quran/show.js";
import {audioPause, loadAudio, playAud} from "/main-quran/loadAudio.js";
import {titleArray} from "/main-quran/title.js";
//const API_TAFSIR = 'https://equran.id/api/v2/tafsir/'
let id = new URLSearchParams(window.location.search).get("id");
//let id = 1; //kontrol index surat
let idAyat = 0; //control index ayat
let audioUrl = [];
let lengthAyat = 0;
let objAyat;
let arrTafsir;
const app = document.getElementById("app");
const audio = document.getElementById("audio");
const lastRead = document.getElementById("btn-lastread");
const selectAyat = document.getElementById("select-ayat");
const titleOnChange = document.getElementById("drop-down-title");
const toggle = document.querySelector("#toggle");
window.addEventListener("load", async () => {
    loadPage(id);
    dropDown(titleArray);
    titleOnChange.value = id;
});

//dropdown list surat////////
async function loadHistory() {
    id = await localStorage.idSurat;
    await loadPage(id);
    idAyat = localStorage.idAyat;
    titleOnChange.value = id;
    const arabs = document.querySelectorAll(".arab");
    arabs[idAyat].scrollIntoView({block: "center", behavior: "smooth"});
    arabs[idAyat].classList.add("playing");
}
//render halaman awal --+--
export async function loadPage(id) {
    const {data, ayat} = await fetchingData(id);
    objAyat = ayat;
    app.innerHTML = show(ayat);
    selectAyat.innerHTML = selectedAyat(ayat);
    audioUrl = await loadAudio(ayat);
    lengthAyat = await (ayat.length - 1);
    arrTafsir = await fetchingTafsir(id);
    const lastCardObserver = new IntersectionObserver(entries => {
        const lastCard = entries[0];
        if (lastCard.isIntersecting) {
            lastCardObserver.unobserve(lastCard.target);
            app.appendChild(loadMore(id));
            const loadMorebtn = document.getElementById("load-more");
            loadMorebtn.addEventListener("click", () => {
                id <= 113 ? id++ : (id = 1);
                titleOnChange.value = id;
                loadPage(id);
                scrollTop();
            });
        }
    }, {});
    const playPause = document.querySelectorAll("#play-pause");
    playPause.forEach(el => {
        el.addEventListener("click", e => {
            const onPlaying = e.target.classList.contains("fa-play");
            onPlaying ? playAudio(e) : pauseAudio(e);
        });
    });
    lastCardObserver.observe(document.querySelector(".card:last-child"));
    const verses = document.querySelectorAll("#tafsir");
    verses.forEach(verse => {
        verse.addEventListener("click", e => {
            const onVerse = e.target.classList.contains("fa-eye-slash");
            onVerse ? openVerse(e) : closeVerse(e);
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

//seekBar footer setiap kali audio onPlay
audio.addEventListener("timeupdate", seekBar);
//audio berakhir berlanjut ke ayat selanjutnya jika sudah ada di lastchild akan pindah ke surat selanjutnya-----
audio.addEventListener("ended", async () => {
    const playPause = document.querySelectorAll("#play-pause");
    playPause.forEach(pP => {
        pP.classList.replace("fa-pause", "fa-play");
    });
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
    audio.pause();
    scrollTop();
};

//tag select list ayat; selected onPlay
selectAyat.onchange = function () {
    idAyat = Number(this.value) - 1;
    const arabs = document.querySelectorAll(".arab");
    arabs[idAyat].scrollIntoView({block: "center", behavior: "smooth"});
};

const scrollTop = () => {
    audio.pause();
    window.scrollTo({
        top: 80
    });
};

function playAudio(e) {
    const playPause = document.querySelectorAll("#play-pause");
    playPause.forEach(pP => {
        pP.classList.replace("fa-pause", "fa-play");
    });
    const element = e.target;
    const id = element.parentElement.id;
    audio.src = audioUrl[id];

    element.classList.replace("fa-play", "fa-pause");
    audio.play();
    document.getElementById("footer").style.visibility = "visible";
}
function pauseAudio(e) {
    const element = e.target;
    element.classList.replace("fa-pause", "fa-play");
    audio.pause();
}

function openVerse(e) {
    const element = e.target;
    const id = element.parentElement.id;
    element.classList.replace("fa-eye-slash", "fa-eye");
    const cards = document.querySelectorAll(".card");
    const div = document.createElement("div");
    div.setAttribute("class", "terjemah");
    div.innerText = `Terjemah:\n${objAyat[id].teksIndonesia}\nTafsir:\n${arrTafsir[id].teks}`;
    cards[id].appendChild(div);
    element.scrollIntoView({
        behavior: "smooth"
    });
}

function closeVerse(e) {
    const element = e.target;
    const id = element.parentElement.id;
    const verseShow = element.classList.contains("fa-eye");
    if (verseShow) {
        element.classList.replace("fa-eye", "fa-eye-slash");
        const cards = document.querySelectorAll(".card");
        cards[id].lastChild.remove();
    }
}

lastRead.addEventListener("click", () => {
    loadHistory();
});
