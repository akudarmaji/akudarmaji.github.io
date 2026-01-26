import {fetchingData} from "/main-quran/fetchingData.js";
import {loadAudio} from "/main-quran/loadAudio.js";

export function show(ayats) {
    let content = "";
    for (var i = 0; i < ayats.length; i++) {
        content += `
      <div class="card">
        <h3 id="" class="arab">${ayats[i].teksArab}</h3>
        <div id="list-menu">
        <i id="humber" class="fa-solid fa-ellipsis"></i>
        <div id="list"></div>
        </div>
      </div>`;
    }
    return content;
}

export function selectedAyat(ayat) {
    let content = "";
    for (let i = 0; i < ayat.length; i++) {
        content += `<option id="${ayat[i].nomorAyat}">${ayat[i].nomorAyat}</option>`;
    }
    return content;
}
export function seekBar() {
    var audio = document.getElementById("audio");
    const currentTime = audio.currentTime;
    const durasi = audio.duration;
    const progressBar = document.getElementById("myRange");
    progressBar.addEventListener("change", () => {
        audio.currentTime = progressBar.value;
    });
    progressBar.max = durasi;
    progressBar.value = currentTime;
}

export function dropDown(titles) {
    const title = document.getElementById("drop-down-title");
    for (let i = 0; i < titles.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", i + 1);
        option.innerText = titles[i];
        title.appendChild(option);
    }
}

export function loadTitleNext(data) {
    if (data.suratSelanjutnya) {
        const nextTitle = data.suratSelanjutnya.namaLatin;
        return nextTitle;
    } else {
        return "finish";
    }
}
