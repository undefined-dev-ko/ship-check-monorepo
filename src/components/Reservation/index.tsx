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
import useModal from '../../hooks/useModal';
import CustomModal from '../Modal';

function Reservation({
  currentDate,
  myself,
}: {
  currentDate: Date;
  myself: User;
}) {
  const clickedDateString = dayjs(currentDate).format('YYYY-MM-DD');
  const { isOpen, message, openModal, closeModal } = useModal();

  const { list: seatList = [] } = useGetAllSeat() || {};
  const { list: reservationList = [] } =
    useGetAllReservation({
      reservedAt: clickedDateString,
    }) || {};

  const { mutateAsync: createReservationMutate } = useCreateReservation();
  const { mutate: cancelReservationMutate } = useCancelReservation();

  const handleCreateReservation = async (seatId: number) => {
    try {
      await createReservationMutate({ seatId, reservedAt: clickedDateString });
    } catch (error: any) {
      if (error.response.status === 409) {
        openModal([
          '이미 예약한 좌석이 있습니다.',
          '예약 취소 후 새롭게 예약이 가능합니다.',
        ]);
      } else if (error.response.status === 400) {
        openModal(['예약할 수 없는 좌석입니다.']);
      }
    }
  };
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

      <CustomModal isOpen={isOpen} onClose={closeModal}>
        {message.map((m, i) => (
          <>
            <p key={i}>{m}</p>
          </>
        ))}
      </CustomModal>
    </Styled.Container>
  );
}

export default Reservation;
