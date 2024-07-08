import dayjs from 'dayjs';
import Styled from './DateBox.styles';
import { useState } from 'react';

const dayDefaultStyle: React.CSSProperties = {
  color: '#1B1B1B',
};
const dayHoverStyle: React.CSSProperties = {
  color: '#FFF',
  background: 'rgba(7, 7, 7, 0.2)',
  cursor: 'pointer',
};
const dayClickedStyle: React.CSSProperties = {
  color: '#FFF',
  background: '#AD00FF',
};
const dayReservedStyle: React.CSSProperties = {
  color: '#AD00FF',
};
const dayTodayStyle: React.CSSProperties = {
  color: '#AD00FF',
  border: '3px solid #AD00FF',
};
const dayDisabledStyle: React.CSSProperties = {
  color: '#B3B3B3',
};

export const getDateStyle = (
  isHovering: boolean,
  isClicked: boolean,
  isReserved: boolean,
  isToday: boolean,
  isDisabled: boolean,
): React.CSSProperties => {
  if (isHovering) {
    return dayHoverStyle;
  }
  if (isClicked) {
    return dayClickedStyle;
  }
  if (isReserved) {
    return dayReservedStyle;
  }
  if (isToday) {
    return dayTodayStyle;
  }
  if (isDisabled) {
    return dayDisabledStyle;
  }
  return dayDefaultStyle;
};

function DateBox({
  date,
  isClicked,
  isReserved,
  isToday,
  isDisabled,
  onClick,
}: {
  date: Date;
  isClicked?: boolean;
  isReserved?: boolean;
  isToday?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <Styled.DateBox
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <div
        className="date"
        style={getDateStyle(
          isHovering,
          isClicked,
          isReserved,
          isToday,
          isDisabled,
        )}
      >
        {date.getDate()}
      </div>
    </Styled.DateBox>
  );
}

export default DateBox;
