/* eslint-disable sonarjs/no-duplicate-string */
import dayjs from 'dayjs'
import {
  dateComparation,
  dateFormat,
  dateGmtUnix,
  dateManipulation,
  getDateList,
  getMondayAndSundayInOneWeekDate,
  getMonthListStartFromThisMonth,
  stringToDateObject,
  unixToDateObject,
} from './formatDate'

describe('dateFormat', () => {
  it('should correctly format a date object', () => {
    const date = new Date('2023-12-31T00:00:00.000Z')
    const format = 'DD/MM/YYYY'
    const locale = 'en'
    const utc = false

    const result = dateFormat({ date, format, locale, utc })

    expect(result).toBe('31/12/2023')
  })

  it('should correctly format a unix timestamp', () => {
    const date = 1640995200 * 1000
    const format = 'DD/MM/YYYY'
    const locale = 'en'
    const utc = false

    const result = dateFormat({ date, format, locale, utc })

    expect(result).toBe('01/01/2022')
  })

  it('should correctly format a string date using a specific format', () => {
    const date = new Date('2023-12-31')
    const format = 'DD/MM/YYYY'
    const locale = 'en'
    const utc = false

    const result = dateFormat({ date, format, locale, utc })

    expect(result).toBe('31/12/2023')
  })

  it('should correctly format a date object in UTC', () => {
    const date = new Date('2023-12-31T00:00:00.000Z')
    const format = 'DD/MM/YYYY'
    const locale = 'en'
    const utc = true

    const result = dateFormat({ date, format, locale, utc })

    expect(result).toBe('31/12/2023')
  })

  it('should correctly format a date object with a different locale', () => {
    const date = new Date('2023-12-31T00:00:00.000Z')
    const format = 'DD/MM/YYYY'
    const locale = 'id'
    const utc = false

    const result = dateFormat({ date, format, locale, utc })

    expect(result).toBe('31/12/2023')
  })
})

describe('dateComparison', () => {
  it('should return true if date is same or before comparedDate', () => {
    const date = dayjs('2023-01-01')
    const comparedDate = dayjs('2023-01-02')
    const result = dateComparation(date).isSameOrBefore(comparedDate)
    expect(result).toBe(true)
  })

  it('should return false if date is after comparedDate', () => {
    const date = dayjs('2023-01-03')
    const comparedDate = dayjs('2023-01-02')
    const result = dateComparation(date).isSameOrBefore(comparedDate)
    expect(result).toBe(false)
  })
})

describe('dateManipulation', () => {
  it('should add a given number of units to the given date', () => {
    const date = dayjs()
    const number = 7
    const addBy = 'hour'
    const result = dateManipulation(date).add(number, addBy).toString()
    expect(result).toEqual(dayjs(date).add(number, addBy).toString())
  })
})

describe('dateGmtUnix', () => {
  it('should subtract 7 hours from the given Unix timestamp', () => {
    const unix = 1629671600000
    const result = dateGmtUnix(unix).toString()
    expect(result).toEqual(dayjs(unix).subtract(7, 'hour').toString())
  })
})

describe('getMondayAndSundayInOneWeekDate', () => {
  it('should return a date object with the start and end dates of a week that starts on Monday and ends on Sunday', () => {
    const startDate = dayjs('2022-06-20')
    const result = getMondayAndSundayInOneWeekDate({ startDate })
    expect(result).toEqual({
      startDate: dayjs('2022-06-20').toDate(),
      endDate: dayjs('2022-06-26').toDate(),
    })
  })
})

describe('getMonthListStartFromThisMonth', () => {
  it('should return a list of months, starting from the current month, in the specified format and locale', () => {
    const startDate = dayjs()
    const lengthOfList = 3
    const format = 'MMMM, YYYY'
    const result = getMonthListStartFromThisMonth({ startDate, lengthOfList, format })
    expect(result).toEqual([
      {
        formatedDate: dayjs().format('MMMM, YYYY'),
        date: dayjs(),
      },
      {
        formatedDate: dayjs().add(1, 'month').format('MMMM, YYYY'),
        date: dayjs().add(1, 'month'),
      },
      {
        formatedDate: dayjs().add(2, 'month').format('MMMM, YYYY'),
        date: dayjs().add(2, 'month'),
      },
    ])
  })
})

describe('getDateList', () => {
  it('should return an array of dates between startDate and endDate', () => {
    const startDate = dayjs('2023-01-01')
    const endDate = dayjs('2023-01-05')
    const expectedResult = [
      dayjs('2023-01-01'),
      dayjs('2023-01-02'),
      dayjs('2023-01-03'),
      dayjs('2023-01-04'),
      dayjs('2023-01-05'),
    ]

    const result = getDateList<Date[]>({ startDate, endDate })

    expect(result).toEqual(expectedResult)
  })

  it('should return an array of formatted dates if format is provided', () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2023-01-05')
    const format = 'DD/MM/YYYY'
    const expectedResult = ['01/01/2023', '02/01/2023', '03/01/2023', '04/01/2023', '05/01/2023']

    const result = getDateList<string[]>({ startDate, endDate, format })

    expect(result).toEqual(expectedResult)
  })
})

describe('unixToDateObject', () => {
  it('should return a valid date object from a Unix timestamp', () => {
    const unixTimestamp = 1629671600000
    const result = unixToDateObject(unixTimestamp)
    expect(result).toEqual(dayjs.unix(unixTimestamp))
  })

  it('should return a valid date object from a string representation of a Unix timestamp', () => {
    const unixTimestamp = '1629671600000'
    const result = unixToDateObject(unixTimestamp)
    expect(result).toEqual(dayjs.unix(+unixTimestamp))
  })
})

describe('stringToDateObject', () => {
  it('should return a valid date object from a string representation of a date', () => {
    const dateString = '2023-06-20'
    const dateFormatType = 'YYYY-MM-DD'
    const result = stringToDateObject(dateString, dateFormatType)
    expect(result).toEqual(dayjs(dateString, dateFormatType).toDate())
  })
})
