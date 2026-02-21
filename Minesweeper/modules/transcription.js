class Transcription {

  static transcribeDataCoordToMatrix(dataCoordArr) {
    let matrixArr = [];
    for (let dataCoord of dataCoordArr) {
      let [x_coord, y_coord] = dataCoord.split('-').map(coords => Number(coords));
      matrixArr.push([x_coord, y_coord]);
    }

    return matrixArr;
  }

  static transcribeMatrixToDataCoord(matrixArr) {
    let dataCoordArr = [];
    for (let [x, y] of matrixArr) {
      dataCoordArr.push(`${x}-${y}`);
    }
    
    return dataCoordArr;
  }
}

export default Transcription;