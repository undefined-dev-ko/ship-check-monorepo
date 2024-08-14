import { User } from '../../../types';
import Styled from './index.styles';

interface RankingCardProps {
  rankType: string;
  rank: { id: number; user: User; count: number };
}

function RankingCard(props: RankingCardProps) {
  const { rankType, rank } = props;
  const { name, team, photo } = rank.user;

  return (
    <Styled.Container>
      <Styled.Icon>
        <img src={getIconURL(rankType)} alt="rank-icon" />
      </Styled.Icon>

      <Styled.Content>
        <img className="profile-img" src={photo} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="team">{team.name}</p>
        <div className="count">
          <p>{rankType === 'cancel' ? '취소' : '출석'}</p>
          <span>{rank.count}</span>
          <p>회</p>
        </div>
      </Styled.Content>
    </Styled.Container>
  );
}

const getIconURL = (rankType: string) => {
  switch (rankType) {
    case '1':
      return '/gold.svg';
    case '2':
      return '/silver.svg';
    case '3':
      return '/bronze.svg';
    case 'ghost':
      return '/ghost.svg';
    case 'cancel':
      return '/skull.svg';
    default:
      return '/logo.svg';
  }
};

export default RankingCard;
