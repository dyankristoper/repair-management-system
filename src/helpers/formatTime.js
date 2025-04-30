export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" }); // Full month name
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
}

export function formatCustomTimestamp(isoString) {
  const date = new Date(isoString);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");

  return `${month}-${day}T${hour}`;
}
