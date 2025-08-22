export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function areNamesEqual(name1: string, name2: string): boolean {
  return normalizeString(name1) === normalizeString(name2);
}
