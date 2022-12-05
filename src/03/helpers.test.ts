/**
 * This file contains tests for helper functions
 */

import * as Helpers from './helpers.js';

describe('helpers/isLowerCase', () => {
  test('It returns correct response', async () => {
    expect(Helpers.isLowerCase('x')).toBeTruthy();
    expect(Helpers.isLowerCase('a')).toBeTruthy();
    expect(Helpers.isLowerCase('e')).toBeTruthy();

    expect(Helpers.isLowerCase('X')).toBeFalsy();
    expect(Helpers.isLowerCase('A')).toBeFalsy();
    expect(Helpers.isLowerCase('E')).toBeFalsy();
  });
});

describe('helpers/getItemPriority', () => {
  test('It returns correct response', async () => {
    expect(Helpers.getItemPriority('a')).toEqual(1);
    expect(Helpers.getItemPriority('z')).toEqual(26);
    expect(Helpers.getItemPriority('A')).toEqual(27);
    expect(Helpers.getItemPriority('Z')).toEqual(52);
  });
});

describe('helpers/splitTextInHalf', () => {
  test('It returns correct response', async () => {
    expect(Helpers.splitTextInHalf('ab')).toEqual(['a', 'b']);
    expect(Helpers.splitTextInHalf('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual([
      'vJrwpWtwJgWr',
      'hcsFMMfFFhFp',
    ]);
    expect(Helpers.splitTextInHalf('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')).toEqual(
      ['jqHRNqRjqzjGDLGL', 'rsFMfFZSrLrFZsSL'],
    );
  });
});

describe('helpers/checkForMatchingChars', () => {
  test('It returns correct response', async () => {
    expect(
      Helpers.checkForMatchingChars('vJrwpWtwJgWr', 'hcsFMMfFFhFp'),
    ).toEqual(['p']);
    expect(
      Helpers.checkForMatchingChars('jqHRNqRjqzjGDLGL', 'rsFMfFZSrLrFZsSL'),
    ).toEqual(['L']);
    expect(Helpers.checkForMatchingChars('PmmdzqPrV', 'vPwwTWBwg')).toEqual([
      'P',
    ]);
  });
});

describe('helpers/checkForMatchingCharsInManyStrings', () => {
  test('It returns correct response', async () => {
    expect(
      Helpers.checkForMatchingCharsInManyStrings([
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
      ]),
    ).toEqual(['r']);
    expect(
      Helpers.checkForMatchingCharsInManyStrings([
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw',
      ]),
    ).toEqual(['Z']);
  });
});
describe('helpers/groupArray', () => {
  test('It returns correct response', async () => {
    expect(
      Helpers.groupArray(
        [
          'vJrwpWtwJgWrhcsFMMfFFhFp',
          'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
          'PmmdzqPrVvPwwTWBwg',
          'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
          'ttgJtRGJQctTZtZT',
          'CrZsJsPPZsGzwwsLwLmpwMDw',
        ],
        3,
      ),
    ).toEqual([
      [
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg',
      ],
      [
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw',
      ],
    ]);
  });
});
