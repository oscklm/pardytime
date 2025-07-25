/**
 * Formats a Unix timestamp into a readable date format
 * @param timestamp - The Unix timestamp (seconds since epoch)
 * @returns Formatted date string in DD/MM/YYYY HH.mm format
 */
function formatUnixTimestamp(timestamp: number): string {
  const unixTimestamp =
    timestamp.toString().length > 10 ? Math.floor(timestamp / 1000) : timestamp;

  // Convert Unix timestamp to Date object (seconds to ms)
  const date = new Date(unixTimestamp * 1000);

  // Format the date using native methods
  const pad = (n: number) => n.toString().padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}.${minutes}`;
}

export { formatUnixTimestamp };
