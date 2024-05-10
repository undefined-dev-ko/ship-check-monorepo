import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  RAW_QUERY,
  useGetAllReservation,
  useGetAllSeat,
} from '../../api/query';
import Calendar from '../../components/Calendar';
import Notice from '../../components/Notice';
import Reservation from '../../components/Reservation';
import Layout from '../../containers/Layout';
import { useTokenAuth } from '../../hooks/useTokenAuth';
import useWeekList from '../../hooks/useWeekList';
import Styled from './index.styles';

function MainPage() {
  const { baseDate, dayNames, setBaseDate, weekList } = useWeekList();
  const [clickedDate, setClickedDate] = useState<Date>(baseDate);
  const todayDate = new Date();
  const clickedDateString = dayjs(clickedDate).format('YYYY-MM-DD');

  const { tokenPair, user } = useTokenAuth();

  const getAllSeatResponse = useGetAllSeat();
  const getAllReservationResponse = useGetAllReservation({
    reservedAt: clickedDateString,
  });

  const { mutate: createReservationMutate } = useMutation({
    mutationFn: RAW_QUERY.createReservation,
    onSuccess: (data) => {
      // refetchReservationList();
    },
  });

  const { mutate: cancelReservationMutate } = useMutation({
    mutationFn: RAW_QUERY.cancelReservation,
    onSuccess: (data) => {
      // refetchReservationList();
    },
  });

  const createReservation = (seatId: number) => {
    createReservationMutate({
      ...tokenPair,
      reservedAt: clickedDateString,
      seatId,
    });
  };

  const cancelReservation = (seatId: number) => {
    cancelReservationMutate({
      ...tokenPair,
      reservedAt: clickedDateString,
      seatId,
    });
  };

  return (
    <Layout>
      <Styled.Container>
        <Styled.MainPageContainer>
          <Styled.ContentHeader>
            <Notice />
          </Styled.ContentHeader>

          <Styled.ContentBody>
            <Calendar
              todayDate={todayDate}
              clickedDate={clickedDate}
              baseDate={baseDate}
              reservedDateList={[
                new Date(),
                new Date('2024-04-12T05:00:00.000+09:00'),
              ]}
              setBaseDate={setBaseDate}
              dayNames={dayNames}
              weekList={weekList}
              onDateClick={(date: Date) => {
                setClickedDate(date);
              }}
            />

            {getAllReservationResponse && (
              <Reservation
                currentDate={clickedDate}
                seatList={getAllSeatResponse.list}
                reservationList={getAllReservationResponse.list}
                myself={user}
                createReservation={createReservation}
                cancelReservation={cancelReservation}
              />
            )}
          </Styled.ContentBody>
        </Styled.MainPageContainer>
      </Styled.Container>
    </Layout>
  );
}

export default MainPage;
