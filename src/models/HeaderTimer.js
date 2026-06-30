class HeaderTimer {

  #timerDiv; // DOM of timer counter's container
  #id; // ID of the setInterval

  constructor(timerDiv) {
    this.#timerDiv = timerDiv;
    this.#id = null;
  }

  reset() {

    this.#timerDiv.textContent = '00:00';
  }

  // Starts a timer at header
  start() {

    let min = 0;
    let sec = 0;
    
    const idInterval = setInterval( () => {

      if (sec === 60) {
        min++;
        sec = 0;
      }
      if (sec === 60 && min === 60) {
        min = 0;
        sec = 0;
      }
      
      let timerMin = min.toString().padStart(2, "0");
      let timerSec = sec.toString().padStart(2, "0");
      
      this.#timerDiv.textContent = `${timerMin}:${timerSec}`;
      
      sec++;
    }, 1000);

    this.#id = idInterval;
  }

  // Stops timer of the header
  stop() {

    clearInterval(this.#id);
  }
}

export default HeaderTimer;