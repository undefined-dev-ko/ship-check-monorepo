import React from 'react';
import dayjs from 'dayjs';

const MAX_DATE_LENGTH = 35;
const MAX_DAY_LENGTH = 7;
const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
type DateValue = {
  date: Date;
  value: number;
};

const useWeekList = (initialDate = new Date()) => {
  const [baseDate, setBaseDate] = React.useState(initialDate);

  const weekList: DateValue[][] = [...new Array(MAX_DATE_LENGTH)]
    .map((_, i) => i + 1)
    .reduce(
      (prev, date) => {
        const day = dayjs(baseDate).set('date', date);
        if (day.month() !== baseDate.getMonth()) {
          return prev;
        }
        prev[prev.length - 1].push({ date: day.toDate(), value: day.date() });
        if (day.day() === 6) {
          prev.push([]);
        }
        return prev;
      },
      [[]] as DateValue[][],
    )
    .filter((v) => !!v.length);

  const weekPrevMonthPadding: DateValue[] = [
    ...new Array(MAX_DAY_LENGTH - weekList[0].length),
  ]
    .map((_, i) => i + 1)
    .map((dateDifference): DateValue => {
      const calculatedDate = dayjs(baseDate)
        .startOf('month')
        .subtract(dateDifference, 'day')
        .toDate();
      return {
        date: calculatedDate,
        value: calculatedDate.getDate(),
      };
    })
    .reverse();

  const weekNextMonthPadding: DateValue[] = [
    ...new Array(MAX_DAY_LENGTH - weekList[weekList.length - 1].length),
  ]
    .map((_, i) => i + 1)
    .map((dateDifference): DateValue => {
      const calculatedDate = dayjs(baseDate)
        .endOf('month')
        .add(dateDifference, 'day')
        .toDate();
      return {
        date: calculatedDate,
        value: calculatedDate.getDate(),
      };
    });

  return {
    baseDate: baseDate,
    setBaseDate: setBaseDate,
    dayNames: DAY_NAMES,
    weekList,
  };
};

export default useWeekList;
