import dayjs from 'dayjs';

export const dateToYYYYMMDD = (date: Date): string => {
  return dayjs(date).format('YYYYMMDD');
};
