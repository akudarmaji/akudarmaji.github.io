class Angkot {
  constructor(sopir = "sopir") {
    this.sopir = sopir;
  }
  penumpang = [];
  kas = 0;
  kembalian = 0;

  uangMasuk(tarif, uang) {
    this.kas += tarif;
    this.kembalian = uang - tarif;
    if (uang === tarif) {
      console.log(`terimakasih telah menggunakan uang pas`);
    } else {
      console.log(`anda membayar dengan uang ${uang}, uang kembalian ${this.kembalian},atas penggunaan jasa kami, saya ${this.sopir} mengucapkan terimakasih`);
    }
    return this.penumpang;
  }

  tambahPenumpang(penumpang) {
    let indexOf = this.penumpang.indexOf(undefined);
    let penumpangBaruTurun = this.penumpang.includes(undefined);
    if (penumpangBaruTurun) {
      this.penumpang[indexOf] = penumpang;
    } else {
      this.penumpang.push(penumpang);
    }
    return this.penumpang;
  }
  penumpangTurun(nama, tarif, uang) {
    switch (tarif) {
      case "lojejer-wuluhan":
      case "wuluhan-lojejer":
      case "wuluhan-kesilir":
      case "kesilir-wuluhan":
      case "kesilir-ambulu":
      case "ambulu-kesilir":
        tarif = 2000;
        break;
      case "lojejer-kesilir":
      case "kesilir-lojejer":
      case "ambulu-wuluhan":
      case "wuluhan-ambulu":
        tarif = 4000;
        break;
      case "lojejer-ambulu":
      case "ambulu-lojejer":
        tarif = 6000;
        break;

      default:
        tarif = 0;
        break;
    }
    let penumpangTurun = this.penumpang.includes(nama);
    let indexOf = this.penumpang.indexOf(nama);
    if (penumpangTurun && tarif !== 0 && uang >= tarif) {
      this.penumpang[indexOf] = undefined;
      return this.uangMasuk(tarif, uang);
    } else {
      console.log(
        `penumpang dengan nama ${nama} tidak ada, atau anda belum bayar. Silakan bayar tarif anda ${tarif}`
      );
    }
    return this.penumpang;
  }
}

const angkot = new Angkot();
const angkot1 = new Angkot("darmaji");
