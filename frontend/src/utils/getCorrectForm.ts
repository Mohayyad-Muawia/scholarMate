export const getCorrectForm = (
  count: number,
  singular: string,
  dual: string,
  plural: string
) => {
  if (count === 1) return singular + " واحدة";
  if (count === 2) return dual;
  if (count >= 3 && count <= 10) return plural;
  return singular;
};
