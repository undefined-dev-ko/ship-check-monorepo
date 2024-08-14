import { User } from '../../types';
import RankingCard from './Card';
import Styled from './index.styles';

interface Rank {
  id: number;
  user: User;
  count: number;
}
interface RankingProps {
  attendance: Rank[];
  ghost: Rank;
  cancel: Rank;
}

function Ranking(props = {}) {
  const { attendance, ghost, cancel } = testData as RankingProps;
  const sortedAttendance = attendance.sort((a, b) => b.count - a.count);

  return (
    <Styled.Container>
      {sortedAttendance.map((rank, idx) => {
        return <RankingCard key={idx} rankType={`${idx + 1}`} rank={rank} />;
      })}
      <RankingCard rankType="ghost" rank={ghost} />
      <RankingCard rankType="cancel" rank={cancel} />
    </Styled.Container>
  );
}

export default Ranking;

const testData = {
  attendance: [
    {
      id: 1,
      user: { name: '장마루', photo: '/maru.jpeg', team: { name: '팀마루' } },
      count: 30,
    },
    {
      id: 2,
      user: { name: '장마루', photo: '/maru.jpeg', team: { name: '팀마루' } },
      count: 20,
    },
    {
      id: 3,
      user: { name: '장마루', photo: '/maru.jpeg', team: { name: '팀마루' } },
      count: 10,
    },
  ],
  ghost: {
    id: 4,
    user: { name: '장마루', photo: '/maru.jpeg', team: { name: '팀마루' } },
    count: 5,
  },
  cancel: {
    id: 5,
    user: { name: '장마루', photo: '/maru.jpeg', team: { name: '팀마루' } },
    count: 1,
  },
};
