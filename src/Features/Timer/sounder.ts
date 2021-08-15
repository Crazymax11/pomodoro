const dingAudio = new Audio('ding-sound-effect_2.mp3');

const tickAudio = new Audio('tick.mp3');
tickAudio.volume = 0.2;
export const sounder = {
  ding: () => {
    dingAudio.play();
  },
  tick: () => {
    tickAudio.play();
  },
};
