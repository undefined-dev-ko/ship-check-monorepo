import { useState } from 'react';
import Calendar from '../../components/Calendar';
import Notice from '../../components/Notice';
import Reservation from '../../components/Reservation';
import Layout from '../../containers/Layout';
import { useTokenAuth } from '../../hooks/useTokenAuth';
import useWeekList from '../../hooks/useWeekList';
import Styled from './index.styles';
import { useGetUser } from '../../api/query';

function MainPage() {
  const { baseDate, dayNames, setBaseDate, weekList } = useWeekList();
  const [clickedDate, setClickedDate] = useState<Date>(baseDate);
  const todayDate = new Date();

  const { isLoggedIn } = useTokenAuth();
  const { data: myself } = useGetUser();

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

            {isLoggedIn && (
              <Reservation currentDate={clickedDate} myself={myself} />
            )}
          </Styled.ContentBody>
        </Styled.MainPageContainer>
      </Styled.Container>
    </Layout>
  );
}

export default MainPage;
