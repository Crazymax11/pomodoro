export const sounder = {
  ding: () => {
    const snd = new Audio('ding-sound-effect_2.mp3');
    snd.play();
  },
  tick: () => {
    const snd = new Audio('tick.mp3');
    snd.play();
  },
};
