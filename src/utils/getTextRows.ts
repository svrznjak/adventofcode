export default function getTextRows(text: string, rowDevider = '\n'): string[] {
  return text.split(rowDevider);
}
