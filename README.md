# chatgpt-schedule
A small tool written with ChatGPT to create a specific sundays schedule as a calendar

# ChatGPTs Readme:

## Project Name

A simple TypeScript project that creates an iCal file from an input list of names and a year.

### Usage

To run the script, first make sure you have TypeScript installed. You can install it by running `npm install -g typescript`.

Then, clone or download the project, and navigate to the project directory in your terminal.

Before running the script, you need to set an environment variable called `GOOGLE_API_KEY` to a valid API key for the Google Calendar API. For example, you can set the environment variable by running this command:

```bash
export GOOGLE_API_KEY=YOUR_API_KEY
```
Run the following command to create the iCal file:

```bash
ts-node index.ts --year 2022 --names "John Smith,Jane Doe" --filename "myEvents.ics"
```

The script takes in three command line arguments:
- `year`: the year for the events
- `names`: a comma-separated list of names for the events
- `filename`: the name of the iCal file to be created

### Example

Let's say you want to create an iCal file for events in 2022, with the names "John Smith" and "Jane Doe". The iCal file should be saved as "myEvents.ics".

You would first set the `GOOGLE_API_KEY` environment variable by running this command:

```bash
export GOOGLE_API_KEY=YOUR_API_KEY
```

Then, you would run the following command:

```bash
ts-node index.ts --year 2022 --names "John Smith,Jane Doe" --filename "myEvents.ics"
```

The script would then create the iCal file "myEvents.ics" with events for "John Smith" and "Jane Doe" in 2022.

Please make sure to replace `YOUR_API_KEY` with a valid API key for the Google Calendar API.

## Conclusion

This script is a simple example of how to use TypeScript to create an iCal file from command line inputs. It demonstrates how to use the `createNameDateMapping` and `createIcalFile` functions, as well as how to parse command line arguments in TypeScript. You can use this script as a starting point to create your own iCal files or to add more functionality.