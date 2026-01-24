import {show} from '/main-quran/show.js';
const url = 'https://equran.id/api/v2/surat/';
export async function fetchingData(id) {
  let controller = new AbortController();
setTimeout(() => controller.abort(), 10000);
try {
  let response = await fetch((`${url}${id}`), {
    signal: controller.signal
  });
  if (response.ok) {
  const {data, data: { ayat } } = await response.json()
  const nextTitle = data.suratSelanjutnya.namaLatin;
  const titleNext = document.getElementById('btn-next');
  titleNext.innerText = nextTitle;
  const title = document.getElementById('title');
  title.innerText = `${data.namaLatin.toUpperCase()} | ${data.nama}`;
  const titleOnplay = document.getElementById('title-onplay');
  titleOnplay.innerText = `${data.namaLatin} | ${ayat.length}/`
  return ayat
}
} catch (err) {
  if (err.name == 'AbortError') { // handle abort()
  location.reload();
    alert("Aborted!, silakan refresh halaman");
  } else {
    throw err;
  }
}
}