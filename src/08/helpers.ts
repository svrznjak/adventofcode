import { ICoordinates } from './interfaces';

export function generateTreeMatrixFromTextRows(ROWS: string[]): number[][] {
  const matrix: number[][] = [];
  for (let y = 0; y < ROWS.length; y++) {
    const ROW = ROWS[y];
    for (let x = 0; x < ROW.length; x++) {
      if (matrix[x] === undefined) matrix[x] = [];
      matrix[y][x] = Number(ROW[x]);
    }
  }
  return matrix;
}

export function getMatrixRow(MATRIX: number[][], ROW_NUMBER: number): number[] {
  return MATRIX[ROW_NUMBER];
}

export function getMatrixCollumn(
  MATRIX: number[][],
  COLLUMN_NUMBER: number,
): number[] {
  return MATRIX.map((row) => {
    return row[COLLUMN_NUMBER];
  });
}

export function getVisibleTrees(TREE_MATRIX: number[][]): ICoordinates[] {
  const visibleTrees: ICoordinates[] = [];
  for (let y = 0; y < TREE_MATRIX.length; y++) {
    for (let x = 0; x < TREE_MATRIX[y].length; x++) {
      if (isTreeVisible(TREE_MATRIX, { x, y })) visibleTrees.push({ x, y });
    }
  }
  return visibleTrees;
}
export function isTreeVisible(
  TREE_MATRIX: number[][],
  TREE_COORDINATE: ICoordinates,
): boolean {
  if (
    isTreeVisibleInLine(
      getMatrixRow(TREE_MATRIX, TREE_COORDINATE.y),
      TREE_COORDINATE.x,
    )
  )
    return true;
  if (
    isTreeVisibleInLine(
      getMatrixCollumn(TREE_MATRIX, TREE_COORDINATE.x),
      TREE_COORDINATE.y,
    )
  )
    return true;
  return false;
}

export function isTreeVisibleInLine(
  LINE: number[],
  TREE_COORDINATE_IN_LINE: number,
): boolean {
  // If tree is first or last in line then it is visible
  if (TREE_COORDINATE_IN_LINE === 0) return true;
  if (TREE_COORDINATE_IN_LINE === LINE.length - 1) return true;

  const TREE_SIZE = LINE[TREE_COORDINATE_IN_LINE];

  // If all trees before are lower then tree in question is visible
  for (let x = 0; x < TREE_COORDINATE_IN_LINE; x++) {
    if (LINE[x] >= TREE_SIZE) {
      // If all trees after are lower then tree in question is visible
      for (let y = LINE.length - 1; y > TREE_COORDINATE_IN_LINE; y--) {
        if (LINE[y] >= TREE_SIZE) {
          return false;
        }
      }
    }
  }

  return true;
}

export function getTreeScenicScore(
  TREE_MATRIX: number[][],
  TREE_COORDINATE: ICoordinates,
): number {
  const TREE_ROW = getMatrixRow(TREE_MATRIX, TREE_COORDINATE.y);
  const TREE_COLLUMN = getMatrixCollumn(TREE_MATRIX, TREE_COORDINATE.x);

  return (
    getTreeScenicScoreInLine(TREE_ROW, TREE_COORDINATE.x) *
    getTreeScenicScoreInLine(TREE_COLLUMN, TREE_COORDINATE.y)
  );
}

export function getTreeScenicScoreInLine(
  LINE: number[],
  TREE_COORDINATE_IN_LINE,
): number {
  const TREE_SIZE = LINE[TREE_COORDINATE_IN_LINE];
  let viewingDistanceToLeft = 0;
  do {
    if (LINE[TREE_COORDINATE_IN_LINE - viewingDistanceToLeft - 1] === undefined)
      break;
    viewingDistanceToLeft++;
  } while (LINE[TREE_COORDINATE_IN_LINE - viewingDistanceToLeft] < TREE_SIZE);

  let viewingDistanceToRight = 0;
  do {
    if (
      LINE[TREE_COORDINATE_IN_LINE + viewingDistanceToRight + 1] === undefined
    )
      break;
    viewingDistanceToRight++;
  } while (LINE[TREE_COORDINATE_IN_LINE + viewingDistanceToRight] < TREE_SIZE);
  return viewingDistanceToLeft * viewingDistanceToRight;
}
