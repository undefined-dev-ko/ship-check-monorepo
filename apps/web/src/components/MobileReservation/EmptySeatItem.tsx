import { Seat } from '../../types';
import Loading from '../Loading';
import Styled from './index.styles';

function EmptySeatItem({
  seat,
  isReserveUI,
  isPending,
  createReservation,
  selectSeat,
}: {
  seat: Seat | undefined;
  isReserveUI: boolean;
  isPending: boolean;
  createReservation: () => void;
  selectSeat: () => void;
}) {
  return (
    <>
      {isReserveUI ? (
        <Styled.ReserveSeatItem onClick={createReservation}>
          {isPending ? <Loading /> : <span>예약하기</span>}
        </Styled.ReserveSeatItem>
      ) : (
        <Styled.EmptySeatItem onClick={selectSeat}>
          <span>{seat?.deskNo || ''}</span>
        </Styled.EmptySeatItem>
      )}
    </>
  );
}

export default EmptySeatItem;
