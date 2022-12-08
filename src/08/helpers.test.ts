/**
 * This file contains tests for helper functions
 */

import * as Helpers from './helpers.js';

describe('helpers/generateTreeMatrixFromTextRows', () => {
  test('It return correct matrix when given array of strings', async () => {
    const EXAMPLE_INPUT: string[] = [
      '30373',
      '25512',
      '65332',
      '33549',
      '35390',
    ];
    const EXAMPLE_CORRECT_RESPONSE = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ];
    expect(Helpers.generateTreeMatrixFromTextRows(EXAMPLE_INPUT)).toEqual(
      EXAMPLE_CORRECT_RESPONSE,
    );
  });
});

describe('helpers/getMatrixRow', () => {
  test('It return correct response', async () => {
    const EXAMPLE_INPUT = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ];
    expect(Helpers.getMatrixRow(EXAMPLE_INPUT, 1)).toEqual([2, 5, 5, 1, 2]);
    expect(Helpers.getMatrixRow(EXAMPLE_INPUT, 4)).toEqual([3, 5, 3, 9, 0]);
  });
});

describe('helpers/getMatrixCollumn', () => {
  test('It return correct response', async () => {
    const EXAMPLE_INPUT = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ];
    expect(Helpers.getMatrixCollumn(EXAMPLE_INPUT, 1)).toEqual([0, 5, 5, 3, 5]);
    expect(Helpers.getMatrixCollumn(EXAMPLE_INPUT, 2)).toEqual([3, 5, 3, 5, 3]);
  });
});

describe('helpers/getVisibleTrees', () => {
  test('Result matches manually reviewed snapshot', async () => {
    const EXAMPLE_INPUT = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ];
    expect(Helpers.getVisibleTrees(EXAMPLE_INPUT)).toMatchSnapshot(
      'getVisibleTreesSnapshot',
    );
  });
});

describe('helpers/getTreeScenicScore', () => {
  test('It returns correct response', async () => {
    const EXAMPLE_INPUT = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ];
    expect(Helpers.getTreeScenicScore(EXAMPLE_INPUT, { x: 2, y: 3 })).toBe(8);
    expect(Helpers.getTreeScenicScore(EXAMPLE_INPUT, { x: 4, y: 2 })).toBe(0);
    expect(Helpers.getTreeScenicScore(EXAMPLE_INPUT, { x: 3, y: 1 })).toBe(1);
    expect(Helpers.getTreeScenicScore(EXAMPLE_INPUT, { x: 0, y: 4 })).toBe(0);
    expect(Helpers.getTreeScenicScore(EXAMPLE_INPUT, { x: 3, y: 3 })).toBe(3);
  });
});
