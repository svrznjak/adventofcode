import getFileContents from '../utils/getFileContents.js';
import { getResultsForPart1, getResultsForPart2 } from './main.js';

describe('Test againts exercise part 1', () => {
  test('test-input should return 21', async () => {
    const fileContents: string = await getFileContents('./src/08/test-input');

    expect(getResultsForPart1(fileContents)).toEqual(21);
  });
  test('input should return 1785', async () => {
    const fileContents: string = await getFileContents('./src/08/input');

    expect(getResultsForPart1(fileContents)).toEqual(1785);
  });
});

describe('Test againts exercise part 2', () => {
  test('test-input should return 8', async () => {
    const fileContents: string = await getFileContents('./src/08/test-input');

    expect(getResultsForPart2(fileContents)).toEqual(8);
  });
  test('input should return 345168', async () => {
    const fileContents: string = await getFileContents('./src/08/input');

    expect(getResultsForPart2(fileContents)).toEqual(345168);
  });
});
