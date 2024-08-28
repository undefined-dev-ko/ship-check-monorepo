import { Reservation } from '../../types';
import Loading from '../Loading';
import Styled from './index.styles';

function ReservedSeatItem({
  reservation,
  isCancelUI,
  isPending,
  isMyReservation,
  cancelReservation,
  selectSeat,
}: {
  reservation: Reservation | undefined;
  isCancelUI: boolean;
  isPending: boolean;
  isMyReservation: boolean;
  cancelReservation: () => void;
  selectSeat: () => void;
}) {
  return (
    <>
      {isCancelUI ? (
        <Styled.CancelSeatItem onClick={cancelReservation}>
          {isPending ? <Loading /> : <span>취소하기</span>}
        </Styled.CancelSeatItem>
      ) : (
        <Styled.ReservedSeatItem
          onClick={selectSeat}
          isMyReservation={isMyReservation}
        >
          <span className="name">{reservation?.user.name}</span>
          <span className="team">{reservation?.user.team?.name}</span>
        </Styled.ReservedSeatItem>
      )}
    </>
  );
}

export default ReservedSeatItem;
