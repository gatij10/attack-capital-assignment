export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const formattedDate = date
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
  return formattedDate;
};
