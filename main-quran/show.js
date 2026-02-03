export function show(ayats) {
    let content = "";
    for (var i = 0; i < ayats.length; i++) {
        content += `
      <div id="${i}" class="card">
<i id="humber" class="fa-regular fa-bookmark"></i>
        <h3 id="" class="arab">${ayats[i].teksArab}</h3>
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

export function showTerjemah(ayats) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
        const div = document.createElement("div");
        div.setAttribute("class", "terjemah");
        div.innerText = ayats[i].teksIndonesia;
        card.appendChild(div);
    });
    terjemah.checked = true;
}

export function hideTerjemah() {
    const terjemahs = document.querySelectorAll(".terjemah");
    terjemahs.forEach((terjemah, i) => {
        terjemah.remove(terjemah);
    });
    terjemah.checked = false;
}

export function showTafsir(tafsir) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
        const div = document.createElement("div");
        div.setAttribute("class", "tafsir");
        div.innerText = tafsir[i].teks;
        card.appendChild(div);
    });
    tafsir.checked = true;
}

export function hideTafsir() {
    const tafsir = document.querySelectorAll(".tafsir");
    tafsir.forEach((taf, i) => {
        taf.remove(taf);
    });
    tafsir.checked = false;
}
