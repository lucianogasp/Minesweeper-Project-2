class Transcription {

  static transcribeDataCoordToMatrix(dataCoord) {
    let [x_coord, y_coord] = dataCoord.split('-').map(coords => Number(coords));

    return [x_coord, y_coord];
  }

  static transcribeMatrixToDataCoord(matrix) {
    let dataCoordArr = [];
    for (let [x, y] of matrix) {
      dataCoordArr.push(`${x}-${y}`);
    }
    
    return dataCoordArr;
  }
}

export default Transcription;