import { google } from 'googleapis';
import { parse, format } from 'date-fns';

const calendar = google.calendar({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY
});

interface Holiday {
    summary: string;
    start: { date: string }
}

interface Holidays {
    items: Holiday[]
}

/**
 * function that retrieves German holiday dates for a given year and holiday name (in German) from a public holiday Google calendar
 *
 * @param {number} year the year for which you want to retrieve the holidays
 * @param {string} holidayName the name of the holiday in German
 * @return {Date[]} returns an array of dates representing the dates of the holiday for that year
 * @throws {Error} if the API call fails or the holiday is not found
 */
async function getHolidayDates(year: number, holidayName: string): Promise<Date[]> {
    try {
        // make a GET request to the events.list method of the calendar API
        // to retrieve all events within the specified year
        const holidays = await calendar.events.list({
            calendarId: 'de.german#holiday@group.v.calendar.google.com',
            timeMin: format(new Date(`${year}-01-01T00:00:00.000Z`), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            timeMax: format(new Date(`${year}-12-31T23:59:59.999Z`), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            singleEvents: true,
            orderBy: 'startTime',
        });
        let holidayDates: Date[] = []
        if (holidays.data && (holidays.data as Holidays).items) {
            holidayDates = (holidays.data as Holidays).items
                .filter((holiday) => holiday.summary === holidayName)
                .map((holiday) => parse(holiday.start.date, "yyyy-MM-dd", new Date()));
        }
        if (holidayDates.length === 0) {
            throw new Error(`Holiday ${holidayName} not found for year ${year}`);
        }
        return holidayDates;
    } catch (err: unknown) {
        console.log('request options:', JSON.stringify({
            calendarId: 'de.german#holiday@group.v.calendar.google.com',
            timeMin: format(new Date(`${year}-01-01T00:00:00.000Z`), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            timeMax: format(new Date(`${year}-12-31T23:59:59.999Z`), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            singleEvents: true,
            orderBy: 'startTime',
        }, null, 2));
        console.error('Error retrieving holiday dates:', err);
        throw new Error(`Error retrieving holiday dates: ${(err as Error).message}`);
    }
}
export default getHolidayDates;
