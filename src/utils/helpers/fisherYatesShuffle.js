// Shuffled method to shuffle squares list using Fisher Yates' shuffle algoritm
export const fisherYatesShuffle = arr => {

  const shuffledArr = Array.from(arr);

  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
};
