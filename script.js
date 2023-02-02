const video = document.querySelector("#myvideo");
const play_pauseBtn = document.querySelector("#play");
const forwardBtn = document.querySelector("#forward");
const backwardBtn = document.querySelector("#backward");
const volumeSlider = document.querySelector(".input-range");
const mute_unmuteBtn = document.querySelector(".mute_unmute");
const progressBar = document.querySelector(".progress-bar");
const currentVidTime = document.querySelector(".current-time");
const VidDuration = document.querySelector(".video-duration");

//Play and Pause function
play_pauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    play_pauseBtn.classList.replace("fa-play", "fa-pause");
  } else {
    video.pause();
    play_pauseBtn.classList.replace("fa-pause", "fa-play");
  }
});

const formatTime = (time) => {
  let sec = Math.floor(time % 60);
  let min = Math.floor(time / 60) % 60;
  let hr = Math.floor(time / 3600);

  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  hr = hr < 10 ? `0${hr}` : hr;

  if (hr == 0) {
    return `${min}:${sec}`;
  }
  return `${hr}:${min}:${sec}`;
};

//Progress bar updating
video.addEventListener("timeupdate", (e) => {
  let { duration, currentTime } = e.target;
  let percent = (currentTime / duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentVidTime.textContent = formatTime(currentTime);
});

//video duration
video.addEventListener("loadeddata", () => {
  VidDuration.textContent = formatTime(video.duration);
});

//forwarding
forwardBtn.addEventListener("click", () => {
  video.currentTime += 5;
});

//backwarding
backwardBtn.addEventListener("click", () => {
  video.currentTime -= 5;
});

//Mute and Unmute button
mute_unmuteBtn.addEventListener("click", () => {
  if (mute_unmuteBtn.classList.contains("fa-volume-high")) {
    video.volume = 0.0;
    mute_unmuteBtn.classList.replace("fa-volume-high", "fa-volume-off");
  } else {
    video.volume = 0.5;
    mute_unmuteBtn.classList.replace("fa-volume-off", "fa-volume-high");
  }
  volumeSlider.value = video.volume;
});

// Volume slider
volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
  if (volumeSlider.value == 0) {
    mute_unmuteBtn.classList.replace("fa-volume-high", "fa-volume-off");
  } else {
    mute_unmuteBtn.classList.replace("fa-volume-off", "fa-volume-high");
  }
});
