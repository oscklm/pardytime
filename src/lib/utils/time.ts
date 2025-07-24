import { format, fromUnixTime } from 'date-fns';

/**
 * Formats a Unix timestamp into a readable date format
 * @param timestamp - The Unix timestamp (seconds since epoch)
 * @returns Formatted date string in DD/MM/YYYY HH.mm format
 */
function formatUnixTimestamp(timestamp: number): string {
  const unixTimestamp =
    timestamp.toString().length > 10 ? Math.floor(timestamp / 1000) : timestamp;

  // Convert Unix timestamp to Date object
  const date = fromUnixTime(unixTimestamp);

  // Format the date using the specified pattern
  return format(date, 'dd/MM/yyyy HH.mm');
}

export { formatUnixTimestamp };
