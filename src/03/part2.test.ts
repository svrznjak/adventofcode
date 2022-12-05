/***
 * This file contains simple integration tests that test for correct response to given input.
 * Test inputs and results are copied from instructions
 */

import getFileContents from '../utils/getFileContents.js';
import part2 from './part2.js';

describe('Test againts exercise part 2', () => {
  test('test-input should return 70', async () => {
    const fileContents: string = await getFileContents(
      './src/03/inputs/test-input',
    );

    expect(part2(fileContents)).toEqual(70);
  });

  test('input should return 2716', async () => {
    const fileContents: string = await getFileContents('./src/03/inputs/input');

    expect(part2(fileContents)).toEqual(2716);
  });
});
