import getTextRows from '../utils/getTextRows';
import {
  checkForMatchingChars,
  getItemPriority,
  splitTextInHalf,
} from './helpers';
// import { } from './helpers';

export default function part1(textInput: string): number {
  // get array of rows from textInput lines
  const RUCKSACKS: string[] = getTextRows(textInput);

  let prioritySum = 0;
  for (const RUCKSACK of RUCKSACKS) {
    const RUCKSACK_COMPARTMENTS = splitTextInHalf(RUCKSACK);
    const MATCHING_CHARS = checkForMatchingChars(...RUCKSACK_COMPARTMENTS);
    prioritySum += getItemPriority(MATCHING_CHARS[0]);
  }
  return prioritySum;
}
