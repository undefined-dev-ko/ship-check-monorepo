import { useState } from 'react';
import { Reservation, Seat, User } from '../../../types';
import Default from './default';
import Fixed from './fixed';
import Reserved from './reserved';

function Desk({
  seat,
  reservation,
  myself,
  createReservation,
  cancelReservation,
}: {
  currentDate: string;
  seat: Seat | undefined;
  reservation: Reservation | undefined;
  myself?: User;
  createReservation: (seatId: number) => void;
  cancelReservation: (seatId: number) => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  if (!seat) {
    return (
      <Default
        isHovering={false}
        handleMouseOver={() => {}}
        handleMouseOut={() => {}}
        onReserveButtonClick={() => {}}
      />
    );
  }

  const { fixedUser, items } = seat;

  // 고정석
  if (fixedUser) {
    return <Fixed name={fixedUser.name} team={fixedUser.team?.name || ''} />;
  }
  // 예약 O
  else if (reservation) {
    const { name, team } = reservation.user;
    const isMine = myself ? myself.id === reservation.user.id : false;
    return (
      <Reserved
        isHovering={isHovering}
        isMine={isMine}
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        name={name}
        team={team ? team.name : '소속팀 없음'}
        onClickCancelButton={() => {
          isMine && cancelReservation(seat.id);
        }}
      />
    );
  }
  // 예약 X
  else {
    return (
      <Default
        isHovering={isHovering}
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        items={items}
        onReserveButtonClick={() => createReservation(seat.id)}
      />
    );
  }
}

export default Desk;
