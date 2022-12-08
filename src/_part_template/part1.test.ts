/***
 * This file contains simple integration tests that test for correct response to given input.
 * Test inputs and results are copied from instructions
 */

import getFileContents from '../utils/getFileContents.js';
import part1 from './part1.js';

describe('Test againts exercise part 1', () => {
  test('test-input should return 0', async () => {
    const fileContents: string = await getFileContents(
      './src/00/inputs/test-input',
    );

    expect(part1(fileContents)).toEqual(0);
  });

  test('input should return 0', async () => {
    const fileContents: string = await getFileContents('./src/00/inputs/input');

    expect(part1(fileContents)).toEqual(0);
  });
});
