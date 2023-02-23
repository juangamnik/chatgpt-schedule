import ICalGenerator from 'ical-generator';
import { format } from 'date-fns-tz';
import { writeFileSync } from 'fs';

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * createIcalFile - creates an iCalendar file with events for the provided dates and names.
 * @param {string} filename - the name of the file to be created
 * @param {Object} events - an object that maps dates to names
 */
export function createIcalFile(filename: string, events: { [date: string]: string }): void {
    // create a new iCalendar object
    const cal = ICalGenerator();

    // iterate through the events object and create an event for each date-name pair
    for (const date in events) {
        const name = events[date];
        cal.createEvent({
            start: format(new Date(date), 'yyyy-MM-dd', { timeZone }),
            end: format(new Date(date), 'yyyy-MM-dd', { timeZone }),
            summary: name,
            allDay: true,
        });
    }

    // write the iCalendar object to the specified file
    writeFileSync(filename, cal.toString());
}
