export const shuffle = arr => {

  const shuffledArr = Array.from(arr);

  // Using Fisher Yates's shuffle algorithm
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
};

export const computeTargetCoords = (y_coord, x_coord, patternsOperation) => {

  const arr = [];
  for (let i of patternsOperation.y_patternOperation) {
    for (let j of patternsOperation.x_patternOperation) {

      if ( patternsOperation.y_patternSkip.includes(i) && patternsOperation.x_patternSkip.includes(j) ) {
        continue;
      }
      let [targetYCoords, targetXCoords] = [y_coord + i, x_coord + j];
      arr.push([targetYCoords, targetXCoords]);
    }
  }

  return arr;
};

export const patternsOperation = {
  y_patternSkip: [0],
  x_patternSkip: [0],
  y_patternOperation: [-1, 0, 1],
  x_patternOperation: [-1, 0, 1],
};
