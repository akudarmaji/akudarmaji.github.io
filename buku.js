class Buku {
  async getBuku(dari, sampai) {
    let buku = await fetch(
      `https://api.hadith.gading.dev/books/bukhari?range=${dari}-${sampai}`
    );
    const { data } = await buku.json();
    this.bacaan = ``
    this.ket = ``
    for(let i = 0; i < data.hadiths.length; i++) {
      this.bacaan += `۝ ${data.hadiths[i].number}<br>${data.hadiths[i].arab} <hr>`
      this.ket += `۝ ${data.hadiths[i].number}<br> ${data.hadiths[i].id} <hr>`
      }
      console.log(this.ket)

    this.judul = document.getElementById('judul')
    this.arab = document.getElementById("arab");
      this.teks = document.getElementById("teks");
      this.judul.innerHTML = `${data.name}` 
      this.arab.innerHTML = this.bacaan
      this.teks.innerHTML = this.ket
    this.container = document.getElementById("container");
    this.container.addEventListener("click", function () {
      this.arab = document.getElementById("arab");
      this.teks = document.getElementById("teks");
      this.teks.scrollTo({ top: 0, behavior: "smooth" });
      this.arab.scrollTo({ top: 0, behavior: "smooth" });
      this.arab.classList.toggle('hidden')
      this.teks.classList.toggle('hidden')
    });
    

    
  }
}
const id = new URLSearchParams(window.location.search)
const index = id.get('dari')
const index2 = id.get('sampai')

// let index = id.urlParams.get('id');;
// let index2 = id.match(/\d+/)[1];

let buku = new Buku();
buku.getBuku(index, index2);
