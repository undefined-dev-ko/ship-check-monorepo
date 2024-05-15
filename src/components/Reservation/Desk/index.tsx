import { useState } from 'react';
import { Item, Reservation, Seat, User } from '../../../types';
import Styled from './index.styles';

function Desk({
  seat,
  reservation,
  myself,
  createReservation,
  cancelReservation,
}: {
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
      <Reserved
        isHovering={false}
        isMine={false}
        handleMouseOver={() => {}}
        handleMouseOut={() => {}}
        name={'Seat없음'}
        team={'Seat없음'}
        onClickCancelButton={() => {}}
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
    const isMine = myself ? myself.id === reservation.user.id : false;
    return (
      <Reserved
        isHovering={isHovering}
        isMine={isMine}
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        name={reservation.user.name}
        team={reservation.user.team?.name || ''}
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
        onReserveButtonClick={() => {
          createReservation(seat.id);
        }}
      />
    );
  }
}

function Fixed({
  name,
  team,
}: {
  name: string;
  team: string; // 'backend' | 'frontend' | 'design' | 'etc';
}) {
  return (
    <Styled.Container className="fixed">
      <p className="name">{name}</p>
      <p className="team">{name === '김종하' ? 'CTO' : team}</p>
    </Styled.Container>
  );
}

function Default({
  isHovering,
  handleMouseOver,
  handleMouseOut,
  onReserveButtonClick,
  items = [],
}: {
  isHovering: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  items: Item[];
  onReserveButtonClick: () => void;
}) {
  return (
    <Styled.Container
      className="default"
      isHovering={isHovering}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isHovering && (
        <>
          <p className="text" onClick={onReserveButtonClick}>
            자리 예약하기
          </p>

          <Styled.ToolTip>
            <img src="/info_icon.svg" alt="info" />

            <div className="tooltiptext">
              {items.length &&
                items.map((item, index) => (
                  <p key={index}>- {convertItems(item)}</p>
                ))}
            </div>
          </Styled.ToolTip>
        </>
      )}
    </Styled.Container>
  );
}

function Reserved({
  isHovering,
  isMine,
  handleMouseOver,
  handleMouseOut,
  name,
  team,
  onClickCancelButton,
}: {
  isHovering: boolean;
  isMine: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  name: string;
  team: string; // 'backend' | 'frontend' | 'design' | 'etc';
  onClickCancelButton: () => void;
}) {
  return (
    <Styled.Container
      className="reserved"
      isHovering={isHovering}
      isMine={isMine}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isMine && isHovering ? (
        <p className="text" onClick={onClickCancelButton}>
          예약 취소하기
        </p>
      ) : (
        <>
          <p className="name">{name}</p>
          <p className="team">{team}</p>
        </>
      )}
    </Styled.Container>
  );
}

// const convertTeam = (team: 'backend' | 'frontend' | 'design' | 'etc') => {
//   switch (team) {
//     case 'backend':
//       return '백엔드팀';
//     case 'frontend':
//       return '프론트엔드팀';
//     case 'design':
//       return '디자인팀';
//     case 'etc':
//       return '기획팀';
//   }
// };

const convertItems = (item: Item): string => {
  switch (item.category) {
    case 'monitor':
      return '모니터';
    case 'arm':
      return '모니터 암';
    case 'charger':
      return 'PD 충전기';
  }
};

export default Desk;
