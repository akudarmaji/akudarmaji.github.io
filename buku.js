class Buku {
  async getBuku(dari, sampai) {
    let buku = await fetch(
      `https://api.hadith.gading.dev/books/bukhari?range=${dari}-${sampai}`
    );
    const { data } = await buku.json();
    this.judul = document.getElementById('judul')
    this.arab = document.getElementById("arab");
      this.teks = document.getElementById("teks");
      this.judul.innerHTML = `${data.name}, nomor ${data.hadiths[0].number}` 
      this.arab.innerText = data.hadiths[0].arab
      this.teks.innerText = data.hadiths[0].id
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
let id = location.href;
id = id.match(/\d+/)[0];

let buku = new Buku();
buku.getBuku(id, id);
