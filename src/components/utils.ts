import { Event, EventFrequency } from "./events";
import { NavbarMode } from "./navbar";

export function normaliseTime(hours: number, minutes: number) {
    return `${(hours > 9) ? hours : "0" + hours}:${(minutes > 9) ? minutes : "0" + minutes}`;
}

export function getTimeFromMinutes(minutes: number) {
    return normaliseTime(Math.floor(minutes / 60), minutes % 60);
}

export function getMinutesFromTime(time: string) {
    return Math.max(((parseInt(time.split(":")[0]) - 6) * 60) + parseInt(time.split(":")[1]), 0);
}

export function getWrittenDate(date: Date) {
  return [`${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]}, ${date.getDate()}`, ["January", "February", "March", "April", "May", "June", "July", "Auugust", "September", "October", "November", "December"][date.getMonth()], date.getFullYear()];
}

export function getFontColour(bgColor: string) {
  let color: string = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  let r: number = parseInt(color.substring(0, 2), 16); // hexToR
  let g: number = parseInt(color.substring(2, 4), 16); // hexToG
  let b: number = parseInt(color.substring(4, 6), 16); // hexToB
  let uicolors: number[] = [r / 255, g / 255, b / 255];
  let c: number[] = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });

  return ((0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]) <= 0.179) ? "#D3D3D3" : "#171717";
}

export function areDatesSameWeek(date1: Date, date2: Date) {
  return (new Date().setTime((date1.getTime() - (date1.getTime() % 86400000)) - (date1.getDay() === 0 ? 7 : date1.getDay()) * 86400000)) === (new Date().setTime((date2.getTime() - (date2.getTime() % 86400000)) - (date2.getDay() === 0 ? 7 : date2.getDay()) * 86400000));
}

export function isDateBetweenDates(date: Date, date1: Date, date2: Date) {
  return stripDate(date).getTime() >= stripDate(date1).getTime() && stripDate(date).getTime() <= stripDate(date2).getTime();
}

export function isDateWorkday(date: Date) {
  return date.getDay() !== 0 && date.getDay() !== 6;
}

export function getFirstDayOfWeek(date: Date) {
  return new Date((date.getTime() - (date.getTime() % 86400000)) - (date.getDay() === 0 ? 7 : date.getDay()) * 86400000 + 86400000);
}

export function stripDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function changeDate(date: Date, changeType: NavbarMode, changeAmount: number) {
  switch (changeType) {
    case NavbarMode.Day:
      return new Date(date.setDate(date.getDate() + changeAmount));
    case NavbarMode.Month:
      return new Date(date.setMonth(date.getMonth() + changeAmount));
    case NavbarMode.Year:
      return new Date(date.setFullYear(date.getFullYear() + changeAmount));
  }
} 

export function doesEventMatchFilters(event: Event, activeDate: Date) {
  switch (event.frequency) {
    case EventFrequency.Once:
      return areDatesSameWeek(event.dateStart, activeDate);
    case EventFrequency.Daily:
      return isDateBetweenDates(activeDate, event.dateStart, event.dateEnd);
    case EventFrequency.Workdays:
      return (isDateBetweenDates(activeDate, event.dateStart, event.dateEnd) && isDateWorkday(activeDate));
    case EventFrequency.Weekends:
      return isDateBetweenDates(activeDate, event.dateStart, event.dateEnd) && !isDateWorkday(activeDate);
      break;
    case EventFrequency.Weekly:
      break;
    case EventFrequency.Monthly:
      break;
    case EventFrequency.Yearly:
      break;
  }
}