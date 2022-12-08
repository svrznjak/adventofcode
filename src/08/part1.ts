import getTextRows from '../utils/getTextRows';
import { generateTreeMatrixFromTextRows, getVisibleTrees } from './helpers';

export default function part1(textInput: string): number {
  // get array of rows from textInput lines
  const INPUT_ROWS: string[] = getTextRows(textInput);

  // generate matrix of trees
  const TREE_MATRIX = generateTreeMatrixFromTextRows(INPUT_ROWS);

  // get visible trees and return number of visible trees
  return getVisibleTrees(TREE_MATRIX).length;
}
