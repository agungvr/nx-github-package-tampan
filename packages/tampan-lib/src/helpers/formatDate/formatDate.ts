/* eslint-disable import/no-named-default */
import dayjs, { Dayjs } from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import { default as isSameOrBeforeExtended } from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/id'

dayjs.extend(isSameOrBeforeExtended)
dayjs.extend(customParseFormat)
dayjs.extend(dayjsUtc)

/** you can add more of format date from here https://day.js.org/docs/en/display/format */
export type DateFormatType =
  | 'DD/MM/YYYY'
  | 'DD/MM/YY'
  | 'DD-MM-YYYY'
  | 'DD MM YYYY'
  | 'DD MMMM YYYY'
  | 'dddd, D MMMM'
  | 'D MMM YYYY'
  | 'D MMM YYYY,  h:mm'
  | 'D MMM YYYY,  HH:mm'
  | 'D MMMM YYYY,  HH:mm'
  | 'YYYY-MM-DD'
  | 'YYYYMMDD'
  | 'dddd, DD MMMM YYYY'
  | 'dddd'
  | 'MMMM, YYYY'
  | 'M'
  | 'YYYY'
  | 'DD MMM YYYY - HH:mm'
  | 'DD MMM YYYY - HH:mm:ss'
  | 'HHmmss'
  | 'HH:mm'
  | 'HHmm'
  | 'DD'
  | 'YYYYMMDD'
  | 'YYYYMM'
  | 'D MMM YYYY - HH:mm'
  | 'dddd, DD MMM YYYY, HH:mm'
  | 'DD MMMM YYYY - HH:mm'
  | 'HH:mm:ss'

type DateType = Date | Dayjs | undefined
type LocaleType = 'en' | 'id'
type AddByType = 'day' | 'week' | 'month' | 'hour'

export const unixToDateObject = (unix: number | string) => dayjs.unix(+unix)

export const stringToDateObject = (dateString: string, dateFormatType: DateFormatType) =>
  dayjs(dateString, dateFormatType).toDate()

export const dateComparation = (date: DateType) => ({
  isSameOrBefore: (comparedDate: DateType) => dayjs(date).isSameOrBefore(comparedDate),
})

export const dateManipulation = (date: DateType) => ({
  add: (number: number, addBy: AddByType) => dayjs(date).add(number, addBy),
})

export const dateGmtUnix = (unix: number) =>
  dateManipulation(dayjs.unix(unix / 1000)).add(-7, 'hour')

const withUtc = (date: DateType | number, utc: boolean) => (utc ? dayjs(date).utc() : dayjs(date))

export const dateFormat = ({
  date,
  format,
  locale,
  utc = false,
}: {
  date: DateType | number
  format: DateFormatType
  locale?: LocaleType
  utc?: boolean
}) =>
  withUtc(date, utc)
    .locale(locale || 'en')
    .format(format)

export const getMondayAndSundayInOneWeekDate = ({ startDate }: { startDate: Date | Dayjs }) => {
  const autoSelectDay = (leftAdd: number, RightAdd: number) => ({
    startDate: dayjs(startDate).add(leftAdd, 'day').toDate(),
    endDate: dayjs(startDate).add(RightAdd, 'day').toDate(),
  })
  const dateObjectList = {
    Monday: autoSelectDay(0, 6),
    Tuesday: autoSelectDay(-1, 5),
    Wednesday: autoSelectDay(-2, 4),
    Thursday: autoSelectDay(-3, 3),
    Friday: autoSelectDay(-4, 2),
    Saturday: autoSelectDay(-5, 1),
    Sunday: autoSelectDay(-6, 0),
  }[dayjs(startDate).format('dddd')]
  return {
    ...dateObjectList,
  }
}

export const getMonthListStartFromThisMonth = ({
  startDate,
  lengthOfList,
  format,
  locale,
}: {
  startDate: DateType
  lengthOfList: number
  format: DateFormatType
  locale?: LocaleType
}) => {
  let listOfMonth: { formatedDate: string; date: DateType }[] = []
  let start = startDate
  let pointer = 0
  do {
    listOfMonth = [
      ...listOfMonth,
      {
        formatedDate: dateFormat({
          date: start,
          format,
          locale,
        }),
        date: start,
      },
    ]
    pointer += 1
    start = dateManipulation(startDate).add(pointer, 'month')
  } while (pointer < lengthOfList)
  return listOfMonth
}

export const getDateList = <T extends (DateType | string)[]>({
  startDate,
  endDate,
  format,
  locale,
}: {
  startDate: DateType
  endDate: DateType
  format?: DateFormatType
  locale?: LocaleType
}): T => {
  let dateRange: (DateType | string)[] = []
  let start = startDate
  do {
    dateRange = [
      ...dateRange,
      format
        ? dateFormat({
            date: start,
            format,
            locale,
          })
        : start,
    ]
    start = dateManipulation(start).add(1, 'day')
  } while (dateComparation(start).isSameOrBefore(endDate))
  return dateRange as T
}
