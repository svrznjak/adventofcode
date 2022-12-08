import getTextRows from '../utils/getTextRows';
import {
  generateTreeMatrixFromTextRows,
  getTreeScenicScore,
  getVisibleTrees,
} from './helpers';
import { ICoordinates } from './interfaces';

export default function part2(textInput: string): number {
  // get array of rows from textInput lines
  const INPUT_ROWS: string[] = getTextRows(textInput);

  // generate matrix of trees
  const TREE_MATRIX = generateTreeMatrixFromTextRows(INPUT_ROWS);

  // get visible trees
  const VISIBLE_TREES: ICoordinates[] = getVisibleTrees(TREE_MATRIX);

  // loop visile trees and calculate scenic score for each. Then store greatest scenic store.
  let greatestScenicScore = 0;
  for (const TREE of VISIBLE_TREES) {
    const TREE_SCENIC_SCORE = getTreeScenicScore(TREE_MATRIX, TREE);
    if (TREE_SCENIC_SCORE > greatestScenicScore)
      greatestScenicScore = TREE_SCENIC_SCORE;
  }

  return greatestScenicScore;
}
