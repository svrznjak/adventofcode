// imports
import fs from 'fs';

// Rules
const WIN = 6;
const DRAW = 3;
const LOST = 0;

const ROCK_BONUS = 1;
const PAPER_BONUS = 2;
const SCISSORS_BONUS = 3;

// Static results (easy solution)
const STATIC_RESULTS = {
  A: {
    X: DRAW + ROCK_BONUS,
    Y: WIN + PAPER_BONUS,
    Z: LOST + SCISSORS_BONUS,
  },
  B: {
    X: LOST + ROCK_BONUS,
    Y: DRAW + PAPER_BONUS,
    Z: WIN + SCISSORS_BONUS,
  },
  C: {
    X: WIN + ROCK_BONUS,
    Y: LOST + PAPER_BONUS,
    Z: DRAW + SCISSORS_BONUS,
  },
};

const STATIC_RESULTS_PART_2 = {
  X: {
    A: 'Z',
    B: 'X',
    C: 'Y',
  },
  Y: {
    A: 'X',
    B: 'Y',
    C: 'Z',
  },
  Z: {
    A: 'Y',
    B: 'Z',
    C: 'X',
  },
};

const fileContents: string = await getFileContents();

const fileContentsByLine: string[] = fileContents.split('\n');

let score = 0;

for (const line of fileContentsByLine) {
  const result = line.split(' ');
  score += STATIC_RESULTS[result[0]][result[1]];
}

console.log(score);

let score_part2 = 0;
for (const line of fileContentsByLine) {
  const input = line.split(' ');
  const response = STATIC_RESULTS_PART_2[input[1]][input[0]];
  score_part2 += STATIC_RESULTS[input[0]][response];
}

console.log(score_part2);

async function getFileContents(): Promise<string> {
  try {
    return await fs.promises.readFile('./src/02/input', 'utf8');
  } catch (err) {
    console.error(err);
    console.info('Stopping program!');
    process.exit();
  }
}
