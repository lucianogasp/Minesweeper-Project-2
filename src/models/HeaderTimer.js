class HeaderTimer {

  #id;

  // Starts a timer at header
  start(timerDiv) {

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
      
      timerDiv.textContent = `${timerMin}:${timerSec}`;
      
      sec++;
    }, 1000);

    this.#id = idInterval;
    return;
  }

  // Stops timer of the header
  stop() {

    clearInterval(this.#id);
    return;
  }
}

export default HeaderTimer;