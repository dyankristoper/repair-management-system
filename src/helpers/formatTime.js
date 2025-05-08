export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" }); // Full month name
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
}
