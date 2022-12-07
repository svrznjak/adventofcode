import * as fs from 'fs/promises';

export default async function getFileContents(path: string): Promise<string> {
  try {
    console.log(fs);
    return await fs.readFile(path, 'utf8');
  } catch (err) {
    console.error(err);
    console.info('Stopping program!');
    process.exit();
  }
}
