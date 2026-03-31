let btn = document.querySelector(".play");
let play = document.querySelector(".play-group");
let pause = document.querySelector(".pause-group");
let cards = document.querySelectorAll(".song-card");
let aud = document.getElementById("song");
let ctr_panel = document.querySelector(".controls");
let songindex = 0;
let NextCard;
let mediaplayer = document.querySelector(".mediaplayer");
let container = document.querySelector(".container");
let controls = document.querySelector(".controls");

function playsong(index) {
  let card = cards[index];
  let img = card.querySelector("img");
  let Pimg = document.querySelector(".player-img img");
  Pimg.src = img.src;
  let song_path = card.dataset.song;
  aud.src = song_path;
  aud.addEventListener('canplay', () => {
    aud.play().catch(error => {
      console.error("Playback failed:", error);
    });
  }, { once: true });
  controlUi(true);
}
let controlUi = (isplaying) => {
  if (isplaying) {
    pause.style.display = "block";
    play.style.display = "none";
  } else {
    pause.style.display = "none";
    play.style.display = "block";
  }
};

btn.addEventListener("click", () => {
  if (aud.paused) {
    aud.play();
    controlUi(true);
  } else {
    aud.pause();
    controlUi(false);
  }
});

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    ctr_panel.style.display = "flex";
    songindex = index;
    playsong(songindex);
  });
});
aud.addEventListener("ended", () => {
  songindex++;
  if (songindex >= cards.length) {
    songindex = 0;
  }
  NextCard = cards[songindex];
  playsong(songindex);
});
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".links").classList.toggle("active");
});
let aud_range = document.querySelector("#seekbar");
aud.addEventListener("timeupdate", () => {
  if (!isNaN(aud.duration)) {
    let progress = (aud.currentTime / aud.duration) * 100;
    aud_range.value = progress;
  }
});
aud_range.addEventListener("input", () => {
  let seekTime = (aud_range.value / 100) * aud.duration;
  aud.currentTime = seekTime;
});
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".previous");
nextBtn.addEventListener("click", () => {
  songindex++;
  if (songindex >= cards.length) {
    songindex = 0;
  }
    NextCard = cards[songindex];
   playsong(songindex);
  
});
prevBtn.addEventListener("click", () => {
  songindex--;
  if (songindex < 0) {
    songindex = cards.length - 1;
  }
    NextCard = cards[songindex];
    playsong(songindex);

});
let drop = document.querySelector(".drop");
let media = document.querySelectorAll(".media");
let player_img = document.querySelector(".player-img");
drop.addEventListener("click", () => {
  controls.classList.toggle("active");
  drop.classList.toggle("active");
  media.forEach(el => el.classList.toggle("small"));
  player_img.classList.toggle("play_img");
  aud_range.classList.toggle("hidden");
});

