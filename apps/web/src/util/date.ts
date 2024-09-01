import dayjs from 'dayjs';

/**
 * 선택한 날짜가 오늘 날짜 이후인지 확인
 * @param date 날짜
 * @returns 오늘 이후면 true 반환
 */
function checkIfDayAfterToday(date: Date) {
  const today = dayjs().startOf('day');

  const inputDate = dayjs(date).startOf('day');

  return !inputDate.isBefore(today);
}

export { checkIfDayAfterToday };
