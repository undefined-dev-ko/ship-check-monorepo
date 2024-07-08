import dayjs from 'dayjs';
import LeftArrowIcon from '../SvgIcons/LeftArrowIcon';
import RightArrowIcon from '../SvgIcons/RightArrowIcon';
import DateBox from './DateBox';
import DayBox from './DayBox';
import Styled from './index.styles';

import { dateToYYYYMMDD } from './util';

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
    if (weekListIndex === 0) {
      setBaseDate(dayjs(baseDate).subtract(1, 'month').endOf('month').toDate());
    } else {
      setBaseDate(dayjs(baseDate).subtract(1, 'week').endOf('week').toDate());
    }
  };
  const onNextButtonClick = () => {
    if (weekList.length === weekListIndex + 1) {
      setBaseDate(dayjs(baseDate).add(1, 'month').startOf('month').toDate());
    } else {
      setBaseDate(dayjs(baseDate).add(1, 'week').startOf('week').toDate());
    }
  };

  const isFirstWeekOfMonth = weekListIndex === 0;
  const reservedDateYYYYMMDDList =
    reservedDateList?.map((v) => dateToYYYYMMDD(v)) || [];

  return (
    <Styled.Container>
      <Styled.Header>{headerTitle}</Styled.Header>

      <Styled.Content>
        <Styled.RoundBox
          className="round_box"
          onClick={() => {
            onPrevButtonClick();
          }}
        >
          <LeftArrowIcon />
        </Styled.RoundBox>

        <div>
          {/** 요일명 출력 */}
          <Styled.FlexHorizontal>
            {dayNames.map((v, i) => (
              <DayBox dayName={v} key={i} />
            ))}
          </Styled.FlexHorizontal>
          <Styled.FlexHorizontal
            style={isFirstWeekOfMonth ? { justifyContent: 'flex-end' } : {}}
          >
            {/** 일 출력 */}
            {weekList[weekListIndex].map((v) => {
              const date = v.date;
              const dateYYYYMMDD = dateToYYYYMMDD(date);
              return (
                <DateBox
                  date={date}
                  onClick={() => {
                    onDateClick(date);
                  }}
                  isClicked={dateYYYYMMDD === dateToYYYYMMDD(clickedDate)}
                  isToday={dateYYYYMMDD === dateToYYYYMMDD(todayDate)}
                  isDisabled={dateYYYYMMDD < dateToYYYYMMDD(todayDate)}
                  isReserved={reservedDateYYYYMMDDList.includes(dateYYYYMMDD)}
                  key={v.date.toString()}
                />
              );
            })}
          </Styled.FlexHorizontal>
        </div>

        <Styled.RoundBox
          className="round_box"
          onClick={() => {
            onNextButtonClick();
          }}
        >
          <RightArrowIcon />
        </Styled.RoundBox>
      </Styled.Content>
    </Styled.Container>
  );
}

export default Calendar;
