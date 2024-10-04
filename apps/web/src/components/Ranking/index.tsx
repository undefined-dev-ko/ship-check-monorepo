import { User } from '../../types';
import RankingCard from './Card';
import LoadingRankingCard from './Card/Loading';
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
  isPendingRanking: boolean;
}

function Ranking(props: RankingProps) {
  const { attendance = [], ghost, cancel, isPendingRanking = true } = props;
  const sortedAttendance = attendance.sort((a, b) => b.count - a.count);
  const filledSortedAttendance = Array.from({ length: 3 }).map(
    (_, index) => sortedAttendance[index],
  );

  return isPendingRanking ? (
    <LoadingRanking />
  ) : (
    <Styled.Container>
      {filledSortedAttendance.map((rank, idx) => {
        return <RankingCard key={idx} rankType={`${idx + 1}`} rank={rank} />;
      })}
      {<RankingCard rankType="ghost" rank={ghost} />}
      {<RankingCard rankType="cancel" rank={cancel} />}
    </Styled.Container>
  );
}

/** 랭킹 로딩 중일 때 노출할 skeleton ui */
function LoadingRanking() {
  return (
    <Styled.Container>
      {Array.from({ length: 5 }).map((_, idx) => (
        <LoadingRankingCard key={idx} />
      ))}
    </Styled.Container>
  );
}

export default Ranking;
