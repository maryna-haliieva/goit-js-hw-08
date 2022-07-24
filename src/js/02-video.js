import Throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOKAL_KEY = 'videoplayer-current-time';

player.on('timeupdate', Throttle(onPlay, 1000));
function onPlay(ev) {
  localStorage.setItem(LOKAL_KEY, ev.seconds);
}

setCurrentTime();
function setCurrentTime() {
  const savedTime = localStorage.getItem(LOKAL_KEY);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
