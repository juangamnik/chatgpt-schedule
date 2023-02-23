import { createDateNameMapping } from './util/calendar'
import { createIcalFile } from './util/ical'
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
if (!argv.year) {
    console.log("Year is required");
    process.exit(1);
}

const year = parseInt(argv.year);

if (!argv.names) {
    console.log("Names are required");
    process.exit(1);
}
const names = argv.names.split(',');

if (!argv.filename) {
    console.log("Filename is required");
    process.exit(1);
}
const filename = argv.filename;


async function main() {

    try {
        const events = await createDateNameMapping(year, names)
        createIcalFile(filename, events)
    } catch (error) {
        console.log(error)
    }
}

main()