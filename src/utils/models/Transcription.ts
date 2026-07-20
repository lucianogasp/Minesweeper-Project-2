class Transcription {

  // Transcribe Data Coord formated (type string) to Matrix (type number)
  static transcribeDataCoordToMatrix(dataCoord: string): [number, number] {
    let [x_coord, y_coord] = dataCoord.split('-').map(coords => Number(coords));

    return [x_coord, y_coord];
  }

  // Transcribe Matrix (type number) to Data Coord formated (type string)
  static transcribeMatrixToDataCoord(matrix: number[][]): string[] {
    let dataCoordArr = [];
    for (let [x, y] of matrix) {
      dataCoordArr.push(`${x}-${y}`);
    }
    
    return dataCoordArr;
  }
}

export default Transcription;