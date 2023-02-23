// Import the date-fns library for date manipulation
import { startOfYear, endOfYear, eachWeekendOfInterval, isSunday } from 'date-fns';
import getHolidayDates from './holiday';


/**
 * Returns an array of date objects representing all the Sundays in a given year, excluding "Christmas Eve" if it falls on a Sunday.
 * @param {number} year - The year for which to get all the Sundays
 * @returns {Date[]} - An array of date objects
 */
export function getSundays(year: number): Date[] {
  // get the start and end of the year
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 11, 31));
  //iterate over all the weekends of the year
  const allWeekends = eachWeekendOfInterval({ start, end });
  //filter out all the Saturdays 
  const sundays = allWeekends.filter(date => isSunday(date) && !(date.getDate() === 24 && date.getMonth() === 11));
  return sundays;
}

/**
 * This function retrieves a list of sundays in a given year
 * as well as the German holidays "Karfreitag" and "Himmelfahrt"
 * and returns all of the dates in a single array wrapped in a promise.
 * @param year - the year for which to retrieve the sundays and holidays
 */
export async function getSundaysAndHolidays(year: number): Promise<Date[]> {
  // Retrieve the sundays in the given year
  const sundays = getSundays(year);
  // Retrieve the German holiday "Karfreitag" and "Himmelfahrt" in the given year
  const [karfreitagDates, himmelfahrtDates] = await Promise.all([
    getHolidayDates(year, "Karfreitag"),
    getHolidayDates(year, "Christi Himmelfahrt"),
  ]);
  
  // Combine the sundays and holidays into a single array
  return [...sundays, ...karfreitagDates, ...himmelfahrtDates];
}

// Function to create a mapping of dates to names
export async function createDateNameMapping(year: number, names: string[]): Promise<{ [date: string]: string }> {
  const sundaysAndHolidays = await getSundaysAndHolidays(year);
  const dateCount = sundaysAndHolidays.length;
  const nameCount = names.length;
  const dateNameMapping: { [date: string]: string } = {};

  // Iterate through the dates and assign each a random name from the input array of names
  for (let i = 0; i < dateCount; i++) {
    const randomIndex = Math.floor(Math.random() * nameCount);
    dateNameMapping[sundaysAndHolidays[i].toISOString()] = names[randomIndex];
  }

  return dateNameMapping;
}