import { useState } from 'react';
import Calendar from '../../components/Calendar';
import Notice from '../../components/Notice';
import Reservation from '../../components/Reservation';
import Layout from '../../containers/Layout';
import { useTokenAuth } from '../../hooks/useTokenAuth';
import useWeekList from '../../hooks/useWeekList';
import Styled from './index.styles';
import {
  useGetJudgements,
  useGetRankingSummary,
  useGetUser,
  useRetrieveReservationList,
} from '../../api/query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import SimpleSlider from '../../components/Slider';
import Ranking from '../../components/Ranking';
import ElmoJudgement from '../../components/ElmoJudgement';
import useCheckIsMobile from '../../hooks/useCheckIsMobile';
import MobileReservation from '../../components/MobileReservation';

dayjs.extend(utc);
dayjs.extend(timezone);

function MainPage() {
  const { baseDate, dayNames, setBaseDate, weekList } = useWeekList();
  const [clickedDate, setClickedDate] = useState<Date>(baseDate);
  const todayDate = new Date();

  const { isLoggedIn } = useTokenAuth();
  const { isMobile } = useCheckIsMobile();

  const { data: myself } = useGetUser({
    enabled: !!isLoggedIn,
  });

  const {
    data: reservationListForDateRange,
    refetch: refetchReservationListForDateRange,
  } = useRetrieveReservationList({
    startReservedAt: dayjs(baseDate).startOf('month').format('YYYY-MM-DD'),
    endReservedAt: dayjs(baseDate).endOf('month').format('YYYY-MM-DD'),
    enabled: !!myself && isLoggedIn,
  });

  const { data: judgementsResponse, refetch: refetchJudgements } =
    useGetJudgements({
      enabled: isLoggedIn,
    });

  const { data: rankingSummaryResponse, isPending: isPendingRanking } =
    useGetRankingSummary({
      reservedMonth: dayjs(clickedDate).format('YYYY-MM'),
      enabled: isLoggedIn,
    });

  const reservedDateList = reservationListForDateRange?.list
    .filter((v) => v.userId === myself?.id)
    .map((v) => dayjs(v.reservedAt).tz('Asia/Seoul', true).toDate());

  return (
    <Layout>
      <Styled.Container>
        <Styled.MainPageContainer>
          <Styled.ContentHeader>
            <Styled.HeaderLeft>
              <Notice />
              <SimpleSlider
                contents={[
                  <Ranking
                    attendance={rankingSummaryResponse?.attendance}
                    ghost={rankingSummaryResponse?.ghost}
                    cancel={rankingSummaryResponse?.cancel}
                    isPendingRanking={isPendingRanking}
                    key="slider_1"
                  />,
                  <ElmoJudgement
                    nameList={judgementsResponse?.userNames || []}
                    key="slider_2"
                  />,
                ]}
              />
            </Styled.HeaderLeft>
            <Styled.HeaderRight>
              <Calendar
                todayDate={todayDate}
                clickedDate={clickedDate}
                baseDate={baseDate}
                reservedDateList={reservedDateList}
                setBaseDate={setBaseDate}
                dayNames={dayNames}
                weekList={weekList}
                onDateClick={(date: Date) => {
                  setClickedDate(date);
                  isLoggedIn && refetchReservationListForDateRange();
                  isLoggedIn && refetchJudgements();
                }}
              />
            </Styled.HeaderRight>
          </Styled.ContentHeader>

          {isLoggedIn &&
            myself &&
            (isMobile ? (
              <MobileReservation currentDate={clickedDate} userInfo={myself} />
            ) : (
              <Reservation currentDate={clickedDate} myself={myself} />
            ))}
        </Styled.MainPageContainer>
      </Styled.Container>
    </Layout>
  );
}

export default MainPage;
