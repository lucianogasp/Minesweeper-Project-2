class FlagCounter {

  flags; // Number of flags remaining. Default: number of bombs at the grid

  constructor(n_bomb) {
    this.flags = n_bomb;
  }

  setFlags(n) {
    this.flags = n;
  }
}

export default FlagCounter;