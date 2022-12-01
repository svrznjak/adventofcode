// Get file
import fs from 'fs';
const fileContents: string = await getFileContents();

const elfs = getElfsFromString(fileContents);

console.log(getTheGreatestElf(elfs));

function getTheGreatestElf(elfs: IElf[]): IElf {
  let theGreatestElf = elfs[0];
  let secondGreatestElf: IElf | undefined = undefined;
  let notSoGreatElf: IElf | undefined = undefined;

  for (let i = 1; i < elfs.length; i++) {
    const currentElf = elfs[i];

    if (currentElf.totalCalories === theGreatestElf.totalCalories) {
      console.warn(
        `Following elfs match calories: ${theGreatestElf.elfId} === ${currentElf.elfId}`,
      );
    }
    if (
      notSoGreatElf !== undefined &&
      currentElf.totalCalories >= notSoGreatElf.totalCalories
    ) {
      notSoGreatElf = currentElf;
    }
    if (
      secondGreatestElf !== undefined &&
      currentElf.totalCalories >= secondGreatestElf.totalCalories
    ) {
      notSoGreatElf = secondGreatestElf;
      secondGreatestElf = currentElf;
    }
    if (currentElf.totalCalories >= theGreatestElf.totalCalories) {
      notSoGreatElf = secondGreatestElf;
      secondGreatestElf = theGreatestElf;
      theGreatestElf = currentElf;
    }
  }
  console.log('Not so great elf:');
  console.log(JSON.stringify(notSoGreatElf));

  console.log('second greatest elf');
  console.log(JSON.stringify(secondGreatestElf));
  console.log(
    theGreatestElf.totalCalories +
      secondGreatestElf.totalCalories +
      notSoGreatElf.totalCalories,
  );
  return theGreatestElf;
}

async function getFileContents(): Promise<string> {
  try {
    return await fs.promises.readFile('./src/01/input', 'utf8');
  } catch (err) {
    console.error(err);
    console.info('Stopping program!');
    process.exit();
  }
}

interface IElf {
  elfId: number;
  caloriesByFood: number[];
  totalCalories: number;
}

function getElfsFromString(input: string): IElf[] {
  const arrayOfValues = input.split('\n');
  const elfs: IElf[] = [];

  let elfCounter = 0;
  for (const value of arrayOfValues) {
    if (elfs[elfCounter] === undefined) {
      elfs[elfCounter] = {
        elfId: elfCounter,
        caloriesByFood: [],
        totalCalories: 0,
      };
    }
    if (value === '') {
      refreshElfTotalCalories(elfs[elfCounter]);
      elfCounter++;
      continue;
    }
    const foodCalories = Number(value);

    if (!isFinite(foodCalories)) {
      throw new Error('One of foods calories is not a number! ' + value);
    }
    elfs[elfCounter].caloriesByFood.push(foodCalories);
  }

  return elfs;
}

function refreshElfTotalCalories(elf: IElf): void {
  elf.totalCalories = elf.caloriesByFood.reduce(
    (totalCalories, foodCalories) => totalCalories + foodCalories,
    0,
  );
}
