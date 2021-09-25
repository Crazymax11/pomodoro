const dingAudio = new Audio('ding-sound-effect_2.mp3');

const tickAudio = new Audio('tick.mp3');

export const sounder = {
  setDingVolume(volume: number) {
    dingAudio.volume = volume;
  },
  setTickVolume(volume: number) {
    tickAudio.volume = volume;
  },
  ding: () => {
    dingAudio.play();
  },
  tick: () => {
    tickAudio.play();
  },
};
