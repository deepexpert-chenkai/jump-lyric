export default class Tiktok {
  constructor(callback, framesPerSec = 60) {
    this.beforeTime = null;
    this.callback = callback;
    this.fps = framesPerSec;
    this.isPlaying = false;
    this.run();
  }

  play = () => {
    this.beforeTime = new Date();
    this.isPlaying = true;
  }

  pause = () => {
    this.isPlaying = false;
  }

  run = () => {
    window.requestAnimationFrame(() => {
      if(this.isPlaying) {
        const currentTime = new Date();
        if(currentTime - this.beforeTime > 1000/this.fps) {
          this.callback(currentTime - this.beforeTime)
          this.beforeTime = currentTime;
        }
      }
      
      this.run();
    })
  }

}