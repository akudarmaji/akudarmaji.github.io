export function loadAudio(ayats) {
    let audioUrl = [];
    Array.from(ayats).forEach((ayat, index) => {
        const {audio} = ayat;
        const abdullahAudio = Object.values(audio)[0];
        audioUrl.push(abdullahAudio);
    });
    return audioUrl;
}

export function playAud(i, element) {
    element.scrollIntoView({
        block: "center",
        behavior: "smooth"
    });
    document.getElementById("footer").style.visibility = "visible";
    const selectAyat = document.getElementById("select-ayat");
    const noPlay = document.getElementById("no-play");
selectAyat.value = i+1;
    noPlay.innerText = i + 1;
    const arabs = document.querySelectorAll(".arab");
    arabs.forEach(arab => {
        arab.classList.remove("playing");
    });
    element.classList.add("playing");
    const audio = document.getElementById("audio");
    audio.play();
}

export function audioPause(element) {
    document.getElementById("footer").style.visibility = "hidden";
    const audio = document.getElementById("audio");
    element.classList.remove("playing");
    audio.pause();
}
