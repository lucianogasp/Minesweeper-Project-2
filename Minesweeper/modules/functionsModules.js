export const shuffle = arr => {

  const shuffledArr = Array.from(arr);

  // Using Fisher Yates's shuffle algorithm
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
};

export const computeTargetCoords = (y_coord, x_coord, patternSkipArr, y_patternOperationArr, x_patternOperationArr) => {

  const arr = [];
  for (let i of y_patternOperationArr) {
    for (let j of x_patternOperationArr) {

      if ( patternSkipArr.includes(i) && patternSkipArr.includes(j) ) {
        continue;
      }
      let [targetYCoords, targetXCoords] = [y_coord + i, x_coord + j];
      arr.push([targetYCoords, targetXCoords]);
    }
  }

  return arr;
};

export const y_patternOperationArr = [-1, 0, 1];
export const x_patternOperationArr = [-1, 0, 1];

export const patternSkipArr = [0, 0];