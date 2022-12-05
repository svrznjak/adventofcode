import getTextRows from '../utils/getTextRows';
import {
  checkForMatchingCharsInManyStrings,
  getItemPriority,
  groupArray,
} from './helpers';
// import { } from './helpers';

export default function part2(textInput: string): number {
  // get array of rows from textInput lines

  const RUCKSACKS: string[] = getTextRows(textInput);
  const GROUPED_RUCKSACKS = groupArray(RUCKSACKS, 3);

  let prioritySum = 0;

  for (const RUCKSACK_GROUP of GROUPED_RUCKSACKS) {
    const MATCHING_CHARS = checkForMatchingCharsInManyStrings(RUCKSACK_GROUP);
    prioritySum += getItemPriority(MATCHING_CHARS[0]);
  }
  return prioritySum;
}
