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
import useModal from '../../hooks/useModal';
import CustomModal from '../Modal';
import { useState } from 'react';

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
      id: 8,
      deskNo: 8,
      reservations: [],
      fixedUser: {
        id: 8,
        name: '김종하',
        team: teamDev,
        email: '',
        photo: '',
        reservations: [],
      },
    },
    {
      id: 13,
      deskNo: 13,
      reservations: [],
      fixedUser: {
        id: 13,
        name: '박상유',
        team: teamPo,
        email: '',
        photo: '',
        reservations: [],
      },
    },
    {
      id: 14,
      deskNo: 14,
      reservations: [],
      fixedUser: {
        id: 14,
        name: '박지연',
        team: teamPo,
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

  const { mutateAsync: createReservationMutate, isPending: isPendingCreate } =
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
          createReservation={seat ? handleCreateReservation : () => {}}
          cancelReservation={seat ? handleCancelReservation : () => {}}
          key={i}
          isPendingCreate={isPendingCreate && selectedSeatId === seat?.id}
          isPendingCancel={isPendingCancel && selectedSeatId === seat?.id}
        />
      </>
    );
  };

  return (
    <Styled.Container>
      <ul className="seat-list">
        {[...Array(15)]
          .map((_, i) => i + 1) // 1 ~ 15 까지의 배열
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
