import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import LeftArrowIcon from '../SvgIcons/LeftArrowIcon';
import RightArrowIcon from '../SvgIcons/RightArrowIcon';
import DateBox from './DateBox';
import DayBox from './DayBox';
import Styled from './index.styles';

import { dateToYYYYMMDD } from './util';

dayjs.extend(utc);
dayjs.extend(timezone);

type DateValue = {
  date: Date;
  value: number;
};
function Calendar({
  baseDate,
  setBaseDate,
  todayDate,
  clickedDate,
  reservedDateList,
  dayNames,
  weekList,
  onDateClick,
}: {
  baseDate: Date;
  setBaseDate: React.Dispatch<React.SetStateAction<Date>>;
  todayDate: Date;
  clickedDate: Date;
  reservedDateList?: Date[];
  dayNames: string[];
  weekList: DateValue[][];

  onDateClick?: (clickedDate: Date) => void;
}) {
  const headerTitle = `${baseDate.getFullYear()}년 ${
    baseDate.getMonth() + 1
  }월`;
  const weekListIndex = weekList.reduce((prev, curr, i) => {
    if (curr.find((v) => v.value === baseDate.getDate())) {
      return i;
    }
    return prev;
  }, 0);

  const onPrevButtonClick = () => {
    setBaseDate(dayjs(baseDate).subtract(1, 'month').endOf('month').toDate());
  };
  const onNextButtonClick = () => {
    setBaseDate(dayjs(baseDate).add(1, 'month').startOf('month').toDate());
  };

  const onTodayButtonClick = () => {
    const today = new Date();
    setBaseDate(today);
    onDateClick(today);
  };

  const isFirstWeekOfMonth = weekListIndex === 0;
  const reservedDateYYYYMMDDList =
    reservedDateList?.map((v) => dateToYYYYMMDD(v)) || [];

  return (
    <Styled.Container>
      <Styled.Header>
        <div className="title">{headerTitle}</div>
        <div className="arrow_navigator">
          <Styled.RoundBox
            className="round_box"
            onClick={() => {
              onPrevButtonClick();
            }}
          >
            <LeftArrowIcon />
          </Styled.RoundBox>
          <button className="right_reset_button" onClick={onTodayButtonClick}>
            오늘
          </button>
          <Styled.RoundBox
            className="round_box"
            onClick={() => {
              onNextButtonClick();
            }}
          >
            <RightArrowIcon />
          </Styled.RoundBox>
        </div>
      </Styled.Header>

      <Styled.Content>
        <div>
          {/** 요일명 출력 */}
          <Styled.FlexHorizontal>
            {dayNames.map((v, i) => (
              <DayBox dayName={v} key={i} />
            ))}
          </Styled.FlexHorizontal>

          {weekList.map((week, i) => {
            return (
              <Styled.FlexHorizontal
                key={i}
                style={i === 0 ? { justifyContent: 'flex-end' } : {}}
              >
                {week.map((day) => {
                  const date = day.date;
                  const dateYYYYMMDD = dateToYYYYMMDD(date);
                  return (
                    <DateBox
                      date={date}
                      onClick={() => {
                        onDateClick(date);
                      }}
                      isClicked={dateYYYYMMDD === dateToYYYYMMDD(clickedDate)}
                      isToday={dateYYYYMMDD === dateToYYYYMMDD(todayDate)}
                      isDisabled={
                        dateYYYYMMDD < dateToYYYYMMDD(todayDate) ||
                        [0, 6].includes(dayjs(date).tz('Asia/Seoul').day())
                      }
                      isReserved={reservedDateYYYYMMDDList.includes(
                        dateYYYYMMDD,
                      )}
                      key={day.date.toString()}
                    />
                  );
                })}
              </Styled.FlexHorizontal>
            );
          })}
        </div>
      </Styled.Content>
    </Styled.Container>
  );
}

export default Calendar;
