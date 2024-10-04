import { Reservation, Seat, User } from '../../types';
import Loading from '../Loading';
import EmptySeatItem from './EmptySeatItem';
import ReservedSeatItem from './ReservedSeatItem';
import Styled from './index.styles';

function SeatItem({
  seat,
  userInfo,
  reservation,
  isSelected,
  handleSelectSeat,
  createReservation,
  cancelReservation,
  isPending,
}: {
  seat: Seat | undefined;
  userInfo?: User;
  reservation: Reservation | undefined;
  isSelected: boolean;
  handleSelectSeat: (seatId: number) => void;
  createReservation: (seatId: number) => void;
  cancelReservation: (seatId: number) => void;
  isPending: boolean;
}) {
  const isFixedSeat = !!seat?.fixedUser;

  const hasReservation = !!reservation;

  const emptySeat = !isFixedSeat && !hasReservation;

  const isMyReservation = userInfo?.id === reservation?.user.id;

  return (
    <>
      {/* 예약이 없는 기본 좌석 */}
      {emptySeat && (
        <EmptySeatItem
          seat={seat}
          isReserveUI={isSelected}
          isPending={isPending}
          createReservation={() => seat?.id && createReservation(seat.id)}
          selectSeat={() => seat?.id && handleSelectSeat(seat.id)}
        />
      )}

      {/* 고정 좌석 */}
      {isFixedSeat && (
        <Styled.FixedSeatItem>
          <span className="name">{seat?.fixedUser?.name}</span>

          <span className="team">
            {seat?.fixedUser?.name === '김종하'
              ? 'CTO'
              : seat?.fixedUser?.team?.name || ''}
          </span>
        </Styled.FixedSeatItem>
      )}

      {/* 예약된 좌석 */}
      {hasReservation && (
        <ReservedSeatItem
          reservation={reservation}
          isCancelUI={isSelected}
          isPending={isPending}
          isMyReservation={isMyReservation}
          cancelReservation={() =>
            isMyReservation && seat?.id && cancelReservation(seat.id)
          }
          selectSeat={() =>
            isMyReservation && seat?.id && handleSelectSeat(seat.id)
          }
        />
      )}
    </>
  );
}

export default SeatItem;
