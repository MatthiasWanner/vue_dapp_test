export const getTruncatedString = (
  string: string | null,
  nbLetters: number
) => {
  if (!string) return '';
  if (string.length < nbLetters * 2) return string;
  const length = string.length;

  const truncatedString = string.substring(nbLetters + 1, length - nbLetters);

  return string.replace(truncatedString, '...');
};
