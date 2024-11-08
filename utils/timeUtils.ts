import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getTimezone } from "./getTimezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCurrentTimeInTimezone = (timezone: string): string => {
  return dayjs().tz(getTimezone(timezone)).format("hh:mm A");
};
