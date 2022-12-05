export function isLowerCase(str: string): boolean {
  return str == str.toLowerCase() && str != str.toUpperCase();
}

export function getItemPriority(itemChar: string): number {
  if (itemChar.length !== 1)
    throw new Error('Recieved itemChar has unexpected length (!=0)!');

  const ASCII_CHAR = itemChar.charCodeAt(0);

  if (isLowerCase(itemChar)) {
    return ASCII_CHAR - 96;
  } else {
    return ASCII_CHAR - 38;
  }
}

export function splitTextInHalf(str: string): [string, string] {
  const STRING_LENGTH = str.length;
  if (STRING_LENGTH % 2 !== 0)
    throw new Error('Text length is not an even number!');

  return [
    str.slice(0, STRING_LENGTH / 2),
    str.slice(STRING_LENGTH / 2, STRING_LENGTH),
  ];
}

export function checkForMatchingChars(str1: string, str2: string): string[] {
  if (str1.length < 1 || str2.length < 1)
    throw new Error('Strings should not be empty!');

  const matchingChars = {};

  for (const char1 of str1) {
    for (const char2 of str2) {
      if (char1 === char2) {
        matchingChars[char1] = true;
      }
    }
  }

  return Object.keys(matchingChars);
}
export function checkForMatchingCharsInManyStrings(
  strings: string[],
): string[] {
  strings.forEach((str) => {
    if (str.length < 1) throw new Error('Strings should not be empty!');
  });

  let matchingChars = checkForMatchingChars(strings[0], strings[1]);
  for (let i = 2; i < strings.length; i++) {
    matchingChars = checkForMatchingChars(matchingChars.join(), strings[i]);
  }
  return matchingChars;
}

export function groupArray<T>(ARRAY: T[], SIZE_OF_GROUP: number): T[][] {
  const groups: T[][] = [[]];

  for (let i = 0, groupCounter = 0; i < ARRAY.length; i++) {
    if (i !== 0 && i % SIZE_OF_GROUP === 0) {
      groupCounter++;
      groups[groupCounter] = [];
    }
    groups[groupCounter].push(ARRAY[i]);
  }

  return groups;
}
