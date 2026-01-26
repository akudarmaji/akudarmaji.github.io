import {show} from "/main-quran/show.js";
const url = "https://equran.id/api/v2/surat/";
export async function fetchingData(id) {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 10000);
    try {
        let response = await fetch(`${url}${id}`, {
            signal: controller.signal
        });
        if (response.ok) {
            const {
                data,
                data: {ayat}
            } = await response.json();
            const titleOnplay = document.getElementById("title-onplay");
            titleOnplay.innerText = `${data.namaLatin} | ${ayat.length}/`;
            return {data, ayat};
        }
    } catch (err) {
        if (err.name == "AbortError") {
            // handle abort()
            location.reload();
            alert("Aborted!, silakan refresh halaman");
        } else {
            throw err;
        }
    }
}

export async function fetchingTitle() {
    let title = [];
    for (let i = 1; i <= 114; i++) {
        let response = await fetch(`${url}${i}`);
        const {data} = await response.json();
        title.push(data.namaLatin);
    }
    return title;
}
