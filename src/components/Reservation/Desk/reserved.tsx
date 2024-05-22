import Styled from './index.styles';

function Reserved({
  isHovering,
  isMine,
  handleMouseOver,
  handleMouseOut,
  name,
  team,
  onClickCancelButton,
}: {
  isHovering: boolean;
  isMine: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  name: string;
  team: string; // 'backend' | 'frontend' | 'design' | 'etc';
  onClickCancelButton: () => void;
}) {
  return (
    <Styled.Container
      className="reserved"
      isHovering={isHovering}
      isMine={isMine}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClickCancelButton}
    >
      {isMine && isHovering ? (
        <p className="text">예약 취소하기</p>
      ) : (
        <>
          <p className="name">{name}</p>
          <p className="team">{convertTeam(team)}</p>
        </>
      )}
    </Styled.Container>
  );
}

const convertTeam = (team: string) => {
  switch (team) {
    case 'backend':
      return '백엔드팀';
    case 'frontend':
      return '프론트엔드팀';
    case 'design':
      return '디자인팀';
    case 'etc':
      return '기획팀';
    default:
      return '소속팀 없음';
  }
};

export default Reserved;
