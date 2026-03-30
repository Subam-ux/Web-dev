document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".play");
  const play = document.querySelector("#play-group");
  const pause = document.querySelector("#pause-group");
  const cards = document.querySelectorAll(".song-card");
  const aud = document.getElementById("song");
  const ctrPanel = document.querySelector(".controls");
  const playerImg = document.querySelector(".player-img img");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".previous");
  const hamburger = document.querySelector(".hamburger");
  const links = document.querySelector(".links");
  const seekbar = document.querySelector("#seekbar");
  const volumeRange = document.querySelector("#volume-range");
  const highVol = document.querySelector("#high-vol");
  const lowVol = document.querySelector("#low-vol");
  const muteVol = document.querySelector("#mute-vol");
  const volumeBtn = document.querySelector("#volumn-btn");

  if (!aud || !btn || !play || !pause || cards.length === 0) {
    return;
  }

  let songIndex = 0;

  const updateControlUi = (isPlaying) => {
    pause.style.display = isPlaying ? "block" : "none";
    play.style.display = isPlaying ? "none" : "block";
  };

  const updatePlayerImage = (card) => {
    if (!card || !playerImg) return;
    const img = card.querySelector("img");
    if (img) {
      playerImg.src = img.src;
      playerImg.alt = img.alt || "Current song cover";
    }
  };

  const loadAndPlaySong = (index) => {
    if (cards.length === 0) return;
    songIndex = (index + cards.length) % cards.length;
    const card = cards[songIndex];
    const songPath = card.dataset.song;

    if (!songPath) return;

    updatePlayerImage(card);
    aud.src = songPath;
    aud.play();
    updateControlUi(true);

    if (ctrPanel) {
      ctrPanel.style.display = "flex";
    }
  };

  btn.addEventListener("click", () => {
    if (aud.paused) {
      aud.play();
      updateControlUi(true);
    } else {
      aud.pause();
      updateControlUi(false);
    }
  });

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      loadAndPlaySong(index);
    });
  });

  aud.addEventListener("ended", () => {
    loadAndPlaySong(songIndex + 1);
  });

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      loadAndPlaySong(songIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      loadAndPlaySong(songIndex - 1);
    });
  }

  if (hamburger && links) {
    hamburger.addEventListener("click", () => {
      links.classList.toggle("active");
    });
  }

  if (seekbar) {
    aud.addEventListener("timeupdate", () => {
      if (!Number.isNaN(aud.duration) && aud.duration > 0) {
        seekbar.value = (aud.currentTime / aud.duration) * 100;
      }
    });

    seekbar.addEventListener("input", () => {
      if (!Number.isNaN(aud.duration) && aud.duration > 0) {
        aud.currentTime = (seekbar.value / 100) * aud.duration;
      }
    });
  }

  const updateVolumeIcons = () => {
    if (!highVol || !lowVol || !muteVol) return;
    const volume = aud.muted ? 0 : aud.volume;
    highVol.style.display = volume > 0.5 ? "block" : "none";
    lowVol.style.display = volume > 0 && volume <= 0.5 ? "block" : "none";
    muteVol.style.display = volume === 0 ? "block" : "none";
  };

  if (volumeRange) {
    aud.volume = Number(volumeRange.value) / 100;
    updateVolumeIcons();

    volumeRange.addEventListener("input", () => {
      const nextVolume = Number(volumeRange.value) / 100;
      aud.muted = false;
      aud.volume = nextVolume;
      updateVolumeIcons();
    });
  }

  if (volumeBtn) {
    volumeBtn.addEventListener("click", (event) => {
      if (event.target === volumeRange) return;
      aud.muted = !aud.muted;
      updateVolumeIcons();
    });
  }
});
