import Lenis from 'lenis';

export class SmoothScroll {
  constructor() {
    this.lenis = null

    this.init();
  }

  init() {
    this.lenis = new Lenis();

    this.raf = this.raf.bind(this);
    requestAnimationFrame(this.raf);
  }


  raf(time) {
    if (this.lenis) {
      this.lenis.raf(time);
      requestAnimationFrame(this.raf);
    }
  }
}
