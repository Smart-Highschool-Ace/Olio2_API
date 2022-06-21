export const parse_yyyy_mm_dd = (dateString: string): Date => {
  const [year, month, day] = dateString.split("_").map(Number);
  return new Date(year, month, day);
};
