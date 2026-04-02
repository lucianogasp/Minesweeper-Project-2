class Timer {

  #onGoing;

  constructor(onGoing) {
    this.#onGoing = onGoing;
  }

  start(timerDiv) {

    let min = 0;
    let sec = 0;
    
    let id = setInterval( () => {
      sec++;
      if (sec === 60) {
        min++;
        sec = 0;
      }
      if (sec === 60 && min === 60) {
        clearInterval(id);
        return;
      }
      timerDiv.textContent = `${min}:${sec}`;
      console.log(sec, min);
    }, 1000);

    
  }

}

export default Timer;