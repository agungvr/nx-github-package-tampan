# Date Helper

## Usage

### dateFormat

Format a date to a desired format.

```ts
const date = new Date(2022, 4, 1)
const format = 'DD/MM/YYYY'
const formattedDate = dateFormat({ date, format })
```

### unixToDateObject

Convert a Unix timestamp to a date object.

```ts
const unixTimestamp = 1611125400
const dateObject = unixToDateObject(unixTimestamp)
```

### stringToDateObject

Convert a string date to a date object.

```ts
const dateString = '2022-05-01'
const dateFormatType = 'YYYY-MM-DD'
const dateObject = stringToDateObject(dateString, dateFormatType)
```

### dateComparation

Compare two dates and return an object that contains the isSameOrBefore method.

```ts
const date = new Date(2022, 4, 1)
const comparedDate = new Date(2022, 5, 1)
const dateComparationResult = dateComparation(date)
const isSameOrBefore = dateComparationResult.isSameOrBefore(comparedDate)
```

### dateManipulation

Manipulate a date by adding or subtracting a certain amount of time.

```ts
const date = new Date(2022, 4, 1)
const dateManipulationResult = dateManipulation(date)
const manipulatedDate = dateManipulationResult.add(2, 'month')
```

### dateGmtUnix

Get the GMT Unix timestamp of a Unix timestamp.

```ts
const unixTimestamp = 1611125400
const gmtUnixTimestamp = dateGmtUnix(unixTimestamp)
```

### getMondayAndSundayInOneWeekDate

Get the Monday and Sunday date of a week starting from a specified date.

```ts
const startDate = new Date(2022, 4, 1)
const weekDates = getMondayAndSundayInOneWeekDate({ startDate })
const mondayDate = weekDates.startDate
const sundayDate = weekDates.endDate
```

### getMonthListStartFromThisMonth

Get a list of months starting from a specified date.

```ts
const months = getMonthListStartFromThisMonth();
console.log(months); // [  "February 2023",  "March 2023",  "April 2023",  "May 2023",  "June 2023",  "July 2023",  "August 2023",  "September 2023",  "October 2023",  "November 2023",  "December 2023",  "January 2024"]

```