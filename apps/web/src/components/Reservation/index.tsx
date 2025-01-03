import Desk from './Desk';
import Styled from './index.styles';
import dayjs from 'dayjs';
import {
  useCancelReservation,
  useCreateReservation,
  useGetAllReservation,
  useGetAllSeat,
} from '../../api/query';
import { Seat, Team, User } from '../../types';
import { useState } from 'react';

function Reservation({
  currentDate,
  myself,
}: {
  currentDate: Date;
  myself: User;
}) {
  const clickedDateString = dayjs(currentDate).format('YYYY-MM-DD');

  const { list: seatList = [] } = useGetAllSeat() || {};

  const teamDev: Team = {
    id: 1,
    name: '개발팀',
    users: [],
  };

  const teamPo: Team = {
    id: 2,
    name: '기획팀',
    users: [],
  };

  const fixedSeatList: Seat[] = [
    {
      id: 10,
      deskNo: 10,
      reservations: [],
      fixedUser: {
        id: 10,
        name: '김종하',
        team: teamDev,
        email: '',
        photo: '',
        reservations: [],
      },
    },
    {
      id: 15,
      deskNo: 15,
      reservations: [],
      fixedUser: {
        id: 15,
        name: '전상훈',
        team: teamPo,
        email: '',
        photo: '',
        reservations: [],
      },
    },
    {
      id: 16,
      deskNo: 16,
      reservations: [],
      fixedUser: {
        id: 16,
        name: '박상유',
        team: teamPo,
        email: '',
        photo: '',
        reservations: [],
      },
    },
    {
      id: 17,
      deskNo: 17,
      reservations: [],
      fixedUser: {
        id: 17,
        name: '이승한',
        team: teamPo,
        email: '',
        photo: '',
        reservations: [],
      },
    },
    {
      id: 18,
      deskNo: 18,
      reservations: [],
      fixedUser: {
        id: 18,
        name: '성인식',
        team: teamPo,
        email: '',
        photo: '',
        reservations: [],
      },
    },
  ];

  const allSeatList = seatList
    .map((seat) => fixedSeatList.find((e) => e.deskNo === seat.deskNo) || seat)
    .sort((a, b) => (a.deskNo > b.deskNo ? 1 : -1));

  const { list: reservationList = [] } =
    useGetAllReservation({
      reservedAt: clickedDateString,
    }) || {};

  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);
  const isActivated = checkIfDayAfterToday(currentDate) && !selectedSeatId;
  const hasMadeReservation = Boolean(
    reservationList?.find((e) => e.user.id === myself.id),
  );

  const { mutate: createReservationMutate, isPending: isPendingCreate } =
    useCreateReservation({
      onSuccess: () => {
        setSelectedSeatId(null);
      },
    });

  const { mutate: cancelReservationMutate, isPending: isPendingCancel } =
    useCancelReservation({
      onSuccess: () => {
        setSelectedSeatId(null);
      },
    });

  const handleCreateReservation = async (seatId: number) => {
    setSelectedSeatId(seatId);
    createReservationMutate({ seatId, reservedAt: clickedDateString });
  };

  const handleCancelReservation = (seatId: number) => {
    setSelectedSeatId(seatId);
    cancelReservationMutate({ seatId, reservedAt: clickedDateString });
  };

  const renderDesk = (deskNo: number, i: number) => {
    const seat = allSeatList && allSeatList.find((e) => e.deskNo === deskNo);
    const reservation =
      reservationList && reservationList.find((v) => v.seat.deskNo === deskNo);

    return (
      <>
        <Desk
          currentDate={clickedDateString}
          seat={seat}
          deskNo={deskNo}
          reservation={reservation}
          myself={myself}
          isActivated={isActivated}
          hasMadeReservation={hasMadeReservation}
          createReservation={seat ? handleCreateReservation : () => {}}
          cancelReservation={seat ? handleCancelReservation : () => {}}
          key={`${deskNo}-${i}`}
          isPendingCreate={isPendingCreate && selectedSeatId === seat?.id}
          isPendingCancel={isPendingCancel && selectedSeatId === seat?.id}
        />
      </>
    );
  };

  return (
    <Styled.Container>
      <div className="meeting-room">회의실 방향</div>

      <Styled.SeatContainer>
        <Styled.SeatList>
          {[...Array(6)]
            .map((_, i) => i + 1) // 1 ~ 6 까지의 좌석
            .map((deskNo, i) => renderDesk(deskNo, i))}
        </Styled.SeatList>

        <Styled.SeatList>
          {[...Array(6)]
            .map((_, i) => i + 7) // 6 ~ 12 까지의 좌석
            .map((deskNo, i) => renderDesk(deskNo, i))}
        </Styled.SeatList>

        <Styled.SeatList>
          {[...Array(6)]
            .map((_, i) => i + 13) // 13 ~ 18 까지의 좌석
            .map((deskNo, i) => renderDesk(deskNo, i))}
        </Styled.SeatList>
      </Styled.SeatContainer>

      <div className="wall">벽 방향</div>
    </Styled.Container>
  );
}

/**
 * 선택한 날짜가 오늘 날짜 이후인지 확인
 * @param date 날짜
 * @returns 오늘 이후면 true 반환
 */
function checkIfDayAfterToday(date: Date) {
  const today = dayjs().startOf('day');
  const inputDate = dayjs(date).startOf('day');
  return !inputDate.isBefore(today);
}

export default Reservation;
