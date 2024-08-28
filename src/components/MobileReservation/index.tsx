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

  const handleSelectSeat = (seatId: number) => {
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
