/***
 * This file contains simple integration tests that test for correct response to given input.
 * Test inputs and results are copied from instructions
 */

import getFileContents from '../utils/getFileContents.js';
import part1 from './part1.js';

describe('Test againts exercise part 1', () => {
  test('test-input should return 21', async () => {
    const fileContents: string = await getFileContents(
      './src/08/inputs/test-input',
    );

    expect(part1(fileContents)).toEqual(21);
  });

  test('input should return 1785', async () => {
    const fileContents: string = await getFileContents('./src/08/inputs/input');

    expect(part1(fileContents)).toEqual(1785);
  });
});
