import Styled from './index.styles';
import dayjs from 'dayjs';
import {
  useCancelReservation,
  useCreateReservation,
  useGetAllReservation,
  useGetAllSeat,
} from '../../api/query';
import { User } from '../../types';
import { fixedSeatList } from '../../constants/fixedSeatList';
import SeatItem from './SeatItem';
import { useState } from 'react';
import useClickOutsideOfElement from '../../hooks/useClickOutsideOfElement';
import { checkIfDayAfterToday } from '../../util/date';

export default function MobileReservation({
  currentDate,
  userInfo,
}: {
  currentDate: Date;
  userInfo?: User;
}) {
  const clickedDateString = dayjs(currentDate).format('YYYY-MM-DD');

  const { list: seatList = [] } = useGetAllSeat() || {};

  const allSeatList = seatList
    .map((seat) => fixedSeatList.find((e) => e.deskNo === seat.deskNo) || seat)
    .sort((a, b) => (a.deskNo > b.deskNo ? 1 : -1));

  const { list: reservationList = [] } =
    useGetAllReservation({
      reservedAt: clickedDateString,
    }) || {};

  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);

  const { mutate: createReservation, isPending: isPendingCreate } =
    useCreateReservation({
      onSuccess: () => {
        setSelectedSeatId(null);
      },
    });

  const { mutate: cancelReservation, isPending: isPendingCancel } =
    useCancelReservation({
      onSuccess: () => {
        setSelectedSeatId(null);
      },
    });

  const alreadyReservedSeat = reservationList.find(
    (reservation) => reservation.userId === userInfo?.id,
  );

  const isAfterToday = checkIfDayAfterToday(currentDate);

  const handleSelectSeat = (seatId: number) => {
    // 오늘 이전 날짜는 선택 불가
    if (!isAfterToday) return;

    // 이미 예약한 좌석이 있는 경우, 예약한 시트의 선택(취소)외에는 선택 방지 (중복 예약방지)
    if (alreadyReservedSeat && alreadyReservedSeat.seatId !== seatId) return;

    setSelectedSeatId(seatId);
  };

  const handleCreateReservation = (seatId: number) => {
    createReservation({ seatId, reservedAt: clickedDateString });
  };

  const handleCancelReservation = (seatId: number) => {
    cancelReservation({ seatId, reservedAt: clickedDateString });
  };

  const { targetElementRef } = useClickOutsideOfElement({
    onClickOutside: () => setSelectedSeatId(null),
  });

  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.SeatList ref={targetElementRef}>
          {allSeatList.map((seat, i) => (
            <SeatItem
              key={`seat-${i}`}
              seat={seat}
              userInfo={userInfo}
              reservation={reservationList.find((r) => r.seatId === seat.id)}
              isSelected={selectedSeatId === seat.id}
              handleSelectSeat={handleSelectSeat}
              createReservation={handleCreateReservation}
              cancelReservation={handleCancelReservation}
              isPending={isPendingCreate || isPendingCancel}
            />
          ))}
        </Styled.SeatList>
      </Styled.Container>
    </Styled.Wrapper>
  );
}
