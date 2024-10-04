import { Rank, User } from '../../../types';
import Styled from './index.styles';

interface RankingCardProps {
  rankType: string;
  rank?: { id: number; user: User; count: number };
}

function RankingCard(props: RankingCardProps) {
  const { rankType, rank = DEFAULT_CONTENT[rankType] } = props;
  const { name, team, photo } = rank?.user ?? {};

  return (
    <Styled.Container>
      <Styled.Icon>
        <img src={getIconURL(rankType)} alt="rank-icon" />
      </Styled.Icon>

      <Styled.Content>
        <img className="profile-img" src={photo} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="team">{team?.name}</p>
        <div className="count">
          <p>{rankType === 'cancel' ? '취소' : '출석'}</p>
          <span>{rankType === 'ghost' ? 0 : rank.count || '?'}</span>
          <p>회</p>
        </div>
      </Styled.Content>
    </Styled.Container>
  );
}

const DEFAULT_CONTENT = {
  '1': {
    id: 1,
    user: {
      name: '출석왕 1등',
      team: { name: '' },
      photo: 'https://placehold.co/600x400?text=1',
    },
    count: 0,
  },
  '2': {
    id: 2,
    user: {
      name: '출석왕 2등',
      team: { name: '' },
      photo: 'https://placehold.co/600x400?text=2',
    },
    count: 0,
  },
  '3': {
    id: 3,
    user: {
      name: '출석왕 3등',
      team: { name: '' },
      photo: 'https://placehold.co/600x400?text=3',
    },
    count: 0,
  },
  ghost: {
    id: 4,
    user: {
      name: '유령',
      team: { name: '' },
      photo: 'https://placehold.co/600x400?text=?',
    },
    count: 0,
  },
  cancel: {
    id: 5,
    user: {
      name: '취소왕',
      team: { name: '' },
      photo: 'https://placehold.co/600x400?text=?',
    },
    count: 0,
  },
} as unknown as Record<string, Rank>;

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
