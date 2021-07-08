// rule 1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.
const isUnderpopulated = (neighboringCells) =>
  getLiveCellCount(neighboringCells) < 2;

// rule 2: Any live cell with two or three live neighbours lives on to the next generation.
const isLivingThroughNextGeneration = (neighboringCells) => {
  const liveCellCount = getLiveCellCount(neighboringCells);
  return liveCellCount == 2 || liveCellCount == 3;
};

// rule 3: Any live cell with more than three live neighbours dies, as if by overpopulation.
const isOverPopulated = (neighboringCells) =>
  getLiveCellCount(neighboringCells) > 3;

// rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
const isBecomingAlive = (neighboringCells) =>
  getLiveCellCount(neighboringCells) == 3;

const getLiveCellCount = (cells) => cells.filter((x) => x.isAlive).length;

export default class RuleEvaluator {
  shouldDie = (cell, neighbors) => {
    if (!cell.isAlive) {
      return false; // already dead
    }

    if (isLivingThroughNextGeneration(neighbors)) {
      return false;
    }

    if (isOverPopulated(neighbors) || isUnderpopulated(neighbors)) {
      return true;
    }
  };

  shouldRevive = (cell, neighbors) => {
    if (cell.isAlive) {
      return false; // already alive
    }

    if (isBecomingAlive(neighbors)) {
      return true;
    }
  };
}
