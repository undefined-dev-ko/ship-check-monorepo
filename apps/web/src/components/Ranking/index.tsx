import { User } from '../../types';
import RankingCard from './Card';
import Styled from './index.styles';

interface Rank {
  id: number;
  user: User;
  count: number;
}
interface RankingProps {
  attendance?: Rank[];
  ghost?: Rank;
  cancel?: Rank;
}

const defaultRanks = [
  {
    id: 1,
    user: { name: '공석', photo: '/maru.jpeg', team: { name: '팀마루' } },
    count: 0,
  } as Rank,
  {
    id: 2,
    user: { name: '공석', photo: '/maru.jpeg', team: { name: '팀마루' } },
    count: 0,
  } as Rank,
  {
    id: 3,
    user: { name: '공석', photo: '/maru.jpeg', team: { name: '팀마루' } },
    count: 0,
  } as Rank,
];

function Ranking(props: RankingProps) {
  const { attendance = [], ghost, cancel } = props;
  const sortedAttendance = attendance.sort((a, b) => b.count - a.count);
  const filledSortedAttendance = Array.from({ length: 3 }).map((_, index) =>
    sortedAttendance[index] ? sortedAttendance[index] : defaultRanks[index],
  );

  return (
    <Styled.Container>
      {filledSortedAttendance.map((rank, idx) => {
        return <RankingCard key={idx} rankType={`${idx + 1}`} rank={rank} />;
      })}
      {ghost && <RankingCard rankType="ghost" rank={ghost} />}
      {cancel && <RankingCard rankType="cancel" rank={cancel} />}
    </Styled.Container>
  );
}

export default Ranking;
