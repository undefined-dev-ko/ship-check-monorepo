import styled from './DayBox.styles';

function DayBox({ dayName }: { dayName: string }) {
  return <styled.DayBox>{dayName}</styled.DayBox>;
}

export default DayBox;
