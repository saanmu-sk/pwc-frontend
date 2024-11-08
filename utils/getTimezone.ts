import moment from "moment-timezone";

export const getTimezone = (offset: string): string | undefined => {
  const hours = parseInt(offset.slice(4, 6), 10);
  const minutes = parseInt(offset.slice(7, 9), 10);
  const totalMinutes = hours * 60 + minutes;
  const isNegative = offset[3] === "-";

  const offsetMinutes = isNegative ? -totalMinutes : totalMinutes;

  const timezone = moment.tz.names().find((zone) => {
    return moment.tz(zone).utcOffset() === offsetMinutes;
  });

  return timezone;
};
