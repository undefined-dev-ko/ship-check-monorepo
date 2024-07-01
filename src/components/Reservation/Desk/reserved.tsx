import Loading from '../../Loading';
import Styled from './index.styles';

function Reserved({
  isHovering,
  isMine,
  isPassed,
  handleMouseOver,
  handleMouseOut,
  name,
  team,
  onClickCancelButton,
  isPendingCancel,
}: {
  isHovering: boolean;
  isMine: boolean;
  isPassed: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  name: string;
  team: string;
  onClickCancelButton: () => void;
  isPendingCancel: boolean;
}) {
  const hoverActive = isMine && isHovering && !isPassed;
  return (
    <Styled.Container
      className="reserved"
      $isHovering={hoverActive}
      isMine={isMine}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={hoverActive ? onClickCancelButton : () => {}}
    >
      {isPendingCancel ? (
        <Loading />
      ) : (
        <>
          {hoverActive ? (
            <p className="text">예약 취소하기</p>
          ) : (
            <>
              <p className="name">{name}</p>
              <p className="team">{team}</p>
            </>
          )}
        </>
      )}
    </Styled.Container>
  );
}

export default Reserved;
