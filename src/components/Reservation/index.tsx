import Desk from './Desk';
import Styled from './index.styles';
import dayjs from 'dayjs';
import {
  useCancelReservation,
  useCreateReservation,
  useGetAllReservation,
  useGetAllSeat,
} from '../../api/query';
import { User } from '../../types';

function Reservation({
  currentDate,
  myself,
}: {
  currentDate: Date;
  myself: User;
}) {
  const clickedDateString = dayjs(currentDate).format('YYYY-MM-DD');

  const { list: seatList = [] } = useGetAllSeat() || {};
  const { list: reservationList = [] } =
    useGetAllReservation({
      reservedAt: clickedDateString,
    }) || {};

  const { mutate: createReservationMutate } = useCreateReservation();
  const { mutate: cancelReservationMutate } = useCancelReservation();

  const handleCreateReservation = (seatId: number) =>
    createReservationMutate({ seatId, reservedAt: clickedDateString });
  const handleCancelReservation = (seatId: number) =>
    cancelReservationMutate({ seatId, reservedAt: clickedDateString });

  const renderDesk = (deskNo: number, i: number) => {
    const seat = seatList && seatList.find((e) => e.deskNo === deskNo);
    const reservation =
      reservationList && reservationList.find((v) => v.seat.deskNo === deskNo);

    return (
      <Desk
        currentDate={clickedDateString}
        seat={seat}
        reservation={reservation}
        myself={myself}
        createReservation={seat ? handleCreateReservation : () => {}}
        cancelReservation={seat ? handleCancelReservation : () => {}}
        key={i}
      />
    );
  };
  return (
    <Styled.Container>
      <ul className="seat-list">
        {[...Array(20)]
          .map((_, i) => i + 1) // 1 ~ 20 까지의 배열
          .map((deskNo, i) => renderDesk(deskNo, i))}
      </ul>
    </Styled.Container>
  );
}

export default Reservation;
