export default function uppercase(
  text: string,
  seperator: string = '-',
): string[] {
  return text.split(seperator).map((t) => t[0].toUpperCase() + t.substring(1));
}
