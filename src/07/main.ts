// imports
// import getFileContents from '../utils/getFileContents';
// const fileContents: string = await getFileContents('./src/07/input');
// const fileContentsByLine: string[] = fileContents.split('\n');

import * as _ from 'lodash';

export function getResultsForPart1({
  lines,
  maxDirSize,
}: {
  lines: string[];
  maxDirSize: number;
}): number {
  const filesystem: filesystemInfo = getDirectoriesFromLines(lines);
  let total = 0;
  filesystem.index.forEach((index) => {
    const DIRECTORY_SIZE = getDirectorySize(_.get(filesystem.directory, index));
    if (DIRECTORY_SIZE <= maxDirSize) {
      total += DIRECTORY_SIZE;
    }
  });

  return total;
}

export function getResultsForPart2({
  lines,
  requiredSpace,
}: {
  lines: string[];
  requiredSpace: number;
}): number {
  const FILESYSTEM_SIZE = 70000000;
  const filesystem: filesystemInfo = getDirectoriesFromLines(lines);

  const USED_SPACE = getDirectorySize(filesystem.directory['/']);
  const AMOUNT_TO_BE_FREED = requiredSpace - (FILESYSTEM_SIZE - USED_SPACE);

  const deletableDirectory = {
    name: '/',
    size: USED_SPACE,
  };
  filesystem.index.forEach((index) => {
    const DIRECTORY_SIZE = getDirectorySize(_.get(filesystem.directory, index));
    if (
      DIRECTORY_SIZE >= AMOUNT_TO_BE_FREED &&
      DIRECTORY_SIZE < deletableDirectory.size
    ) {
      deletableDirectory.name = index;
      deletableDirectory.size = DIRECTORY_SIZE;
    }
  });
  return deletableDirectory.size;
}

interface filesystemInfo {
  directory: object;
  index: string[];
}
function getDirectoriesFromLines(lines: string[]): filesystemInfo {
  const currentDirectory: string[] = [];
  const directory = {};
  const directoryIndex: string[] = [];

  for (const line of lines) {
    if (getLineType(line) === LineType.CHANGE_DIRECTORY) {
      // remove command ($ cd) from line to get directory name
      const NEW_DIRECTORY = line.slice(5);
      if (NEW_DIRECTORY === '..') {
        currentDirectory.pop();
      } else {
        currentDirectory.push(NEW_DIRECTORY);
        // initialize directory
        if (_.get(directory, currentDirectory) === undefined) {
          _.set(directory, currentDirectory, {});
          directoryIndex.push(currentDirectory.join('.'));
        }
      }
    } else if (getLineType(line) === LineType.FILE_RECORD) {
      const FILE_INFO = line.split(' ');
      _.set(directory, currentDirectory.concat([FILE_INFO[1]]), FILE_INFO[0]);
    }
  }
  return {
    directory: directory,
    index: directoryIndex,
  };
}

function getDirectorySize(dir: object): number {
  let size = 0;
  for (const item in dir) {
    if (typeof dir[item] !== 'object') {
      size += Number(dir[item]);
    } else {
      size += getDirectorySize(dir[item]);
    }
  }
  return size;
}

export enum LineType {
  CHANGE_DIRECTORY,
  LIST_DIRECTORY,
  DIRECTORY_RECORD,
  FILE_RECORD,
}

export function getLineType(line: string): LineType {
  if (/^\$\scd.+$/g.exec(line)) {
    return LineType.CHANGE_DIRECTORY;
  } else if (/^\$\sls$/g.exec(line)) {
    return LineType.LIST_DIRECTORY;
  } else if (/^dir.+$/g.exec(line)) {
    return LineType.DIRECTORY_RECORD;
  } else if (/^[0-9].+$/g.exec(line)) {
    return LineType.FILE_RECORD;
  }
  throw new Error('Could not identify LineType');
}
