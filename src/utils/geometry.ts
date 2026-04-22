export const getRectangularGrid = (numberOfItems: number): [number, number] => {
  if (numberOfItems <= 0) {
    return [0, 0];
  }

  let bestFit: [number, number] = [1, numberOfItems];
  let minDiff = numberOfItems - 1;

  for (let rows = 1; rows <= Math.sqrt(numberOfItems); rows++) {
    if (numberOfItems % rows === 0) {
      const cols = numberOfItems / rows;
      const diff = Math.abs(cols - rows);

      if (diff < minDiff) {
        minDiff = diff;
        bestFit = [rows, cols];
      }
    }
  }

  return bestFit;
};
