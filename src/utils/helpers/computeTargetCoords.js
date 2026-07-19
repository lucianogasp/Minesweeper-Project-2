// UTILITIES: compute target coords method
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