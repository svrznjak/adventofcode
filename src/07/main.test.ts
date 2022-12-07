import getFileContents from '../utils/getFileContents.js';
import {
  getLineType,
  getResultsForPart1,
  getResultsForPart2,
  LineType,
} from './main.js';
describe('Helper functions', () => {
  test('todo: write test description', () => {
    expect(getLineType('$ cd x')).toBe(LineType.CHANGE_DIRECTORY);
    expect(getLineType('$ ls')).toBe(LineType.LIST_DIRECTORY);
    expect(getLineType('22133 x.a')).toBe(LineType.FILE_RECORD);
    expect(getLineType('dir x')).toBe(LineType.DIRECTORY_RECORD);
  });
});

describe('Test againts exercise part 1', () => {
  test('test-input should return 95437', async () => {
    const fileContents: string = await getFileContents('./src/07/test-input');
    const fileContentsByLine: string[] = fileContents.split('\n');

    expect(
      getResultsForPart1({ lines: fileContentsByLine, maxDirSize: 100000 }),
    ).toEqual(95437);
  });
  test('input should return 2104783', async () => {
    const fileContents: string = await getFileContents('./src/07/input');
    const fileContentsByLine: string[] = fileContents.split('\n');

    expect(
      getResultsForPart1({ lines: fileContentsByLine, maxDirSize: 100000 }),
    ).toEqual(2104783);
  });
});

describe('Test againts exercise part 2', () => {
  test('input should return 2104783', async () => {
    const fileContents: string = await getFileContents('./src/07/input');
    const fileContentsByLine: string[] = fileContents.split('\n');

    expect(
      getResultsForPart2({
        lines: fileContentsByLine,
        requiredSpace: 30000000,
      }),
    ).toEqual(2104783);
  });
});
