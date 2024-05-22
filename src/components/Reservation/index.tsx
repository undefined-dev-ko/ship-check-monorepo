import Desk from './Desk';
import Styled from './index.styles';
import dayjs from 'dayjs';
import {
  useCancelReservation,
  useCreateReservation,
  useGetAllReservation,
  useGetAllSeat,
  useGetUser,
} from '../../api/query';

function Reservation({ currentDate }: { currentDate: Date }) {
  const clickedDateString = dayjs(currentDate).format('YYYY-MM-DD');

  const { list: seatList } = useGetAllSeat() ?? {};

  const { list: reservationList } =
    useGetAllReservation({
      reservedAt: clickedDateString,
    }) ?? {};

  const { data: myself } = useGetUser();

  const { mutate: createReservationMutate } = useCreateReservation();
  const { mutate: cancelReservationMutate } = useCancelReservation();
  const handleCreateReservation = (seatId: number) =>
    createReservationMutate({ seatId, reservedAt: clickedDateString });

  const handleCancelReservation = (seatId: number) =>
    cancelReservationMutate({ seatId, reservedAt: clickedDateString });

  if (!seatList || !reservationList) return <>loading</>;

  return (
    <Styled.Container>
      <ul className="seat-list">
        {[...Array(20)]
          .map((_, i) => i + 1) // 1 ~ 20 까지의 배열
          .map((deskNo, i) => (
            <Desk
              currentDate={clickedDateString}
              seat={seatList.find((e) => e.deskNo === deskNo)}
              reservation={reservationList.find(
                (v) => v.seat.deskNo === deskNo,
              )}
              myself={myself}
              createReservation={handleCreateReservation}
              cancelReservation={handleCancelReservation}
              key={i}
            />
          ))}
      </ul>
    </Styled.Container>
  );
}

export default Reservation;
