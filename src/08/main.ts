import getTextRows from '../utils/getTextRows';
import { matrix } from './interfaces';

export function getResultsForPart1(textInput: string): number {
  // get array of rows from textInput lines
  const INPUT_ROWS: string[] = getTextRows(textInput);

  // generate matrix of trees
  const TREE_MATRIX = generateTreeMatrix(INPUT_ROWS);

  return getVisibleTrees(TREE_MATRIX).length;
}

export function getResultsForPart2(textInput: string): number {
  // get array of rows from textInput lines
  const INPUT_ROWS: string[] = getTextRows(textInput);

  // generate matrix of trees
  const TREE_MATRIX = generateTreeMatrix(INPUT_ROWS);

  const VISIBLE_TREES: matrix[] = getVisibleTrees(TREE_MATRIX);

  let greatestScenicScore = 0;
  for (const TREE of VISIBLE_TREES) {
    const TREE_SCENIC_SCORE = getTreeScenicScore(TREE_MATRIX, TREE);
    if (TREE_SCENIC_SCORE > greatestScenicScore)
      greatestScenicScore = TREE_SCENIC_SCORE;
  }
  return greatestScenicScore;
}

function getVisibleTrees(TREE_MATRIX: number[][]): matrix[] {
  const visibleTrees: matrix[] = [];
  for (let y = 0; y < TREE_MATRIX.length; y++) {
    for (let x = 0; x < TREE_MATRIX[y].length; x++) {
      if (isTreeVisible(TREE_MATRIX, { x, y })) visibleTrees.push({ x, y });
    }
  }
  return visibleTrees;
}

function getTreeScenicScore(
  TREE_MATRIX: number[][],
  TREE_COORDINATE: matrix,
): number {
  const TREE_ROW = getMatrixRow(TREE_MATRIX, TREE_COORDINATE.y);
  const TREE_COLLUMN = getMatrixCollumn(TREE_MATRIX, TREE_COORDINATE.x);

  return (
    getTreeScenicScoreInLine(TREE_ROW, TREE_COORDINATE.x) *
    getTreeScenicScoreInLine(TREE_COLLUMN, TREE_COORDINATE.y)
  );
}

function getTreeScenicScoreInLine(
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

function generateTreeMatrix(ROWS: string[]): number[][] {
  const matrix: number[][] = [];
  for (let y = 0; y < ROWS.length; y++) {
    const ROW = ROWS[y];
    for (let x = 0; x < ROW.length; x++) {
      if (matrix[x] === undefined) matrix[x] = [];
      matrix[x][y] = Number(ROW[x]);
    }
  }
  return matrix;
}

function getMatrixRow(MATRIX: number[][], ROW_NUMBER: number): number[] {
  return MATRIX[ROW_NUMBER];
}

function getMatrixCollumn(
  MATRIX: number[][],
  COLLUMN_NUMBER: number,
): number[] {
  return MATRIX.map((row) => {
    return row[COLLUMN_NUMBER];
  });
}

function isTreeVisible(
  TREE_MATRIX: number[][],
  TREE_COORDINATE: matrix,
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

function isTreeVisibleInLine(
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
