import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCAL_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));
function onPlay(ev) {
  localStorage.setItem(LOCAL_KEY, ev.seconds);
}

setCurrentTime();
function setCurrentTime() {
  const savedTime = localStorage.getItem(LOCAL_KEY);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
