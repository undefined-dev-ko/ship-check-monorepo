import Styled from './index.styles';

function Fixed({ name, team }: { name: string; team: string }) {
  return (
    <Styled.Container className="fixed">
      <p className="name">{name}</p>
      <p className="team">{name === '김종하' ? 'CTO' : team}</p>
    </Styled.Container>
  );
}

export default Fixed;
