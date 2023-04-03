export const getQueriesFromUrl = (url: string) => {
  const searchParams = new URL(url).searchParams;
  return Object.fromEntries(searchParams.entries());
};
