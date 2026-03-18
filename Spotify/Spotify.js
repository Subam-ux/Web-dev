let btn = document.querySelector(".play");
let play = document.querySelector("#play-group");
let pause = document.querySelector("#pause-group");
btn.addEventListener("click", () => {
  if (aud.paused) {
    aud.play();
    pause.style.display = "block";
    play.style.display = "none";
  } else {
    aud.pause();
    pause.style.display = "none";
    play.style.display = "block";
  }
});
let cards = document.querySelectorAll(".song-card");
let aud = document.getElementById("song");
let ctr_panel = document.querySelector(".controls");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (ctr_panel.style.display === "none" || ctr_panel.style.display === "") {
      ctr_panel.style.display = "flex";
    }
    let song_path = card.dataset.song;
    aud.src = song_path;
    aud.play();
    pause.style.display = "block";
    play.style.display = "none";
  });
});
aud.addEventListener("ended", () => {
  pause.style.display = "none";
  play.style.display = "block";
});
