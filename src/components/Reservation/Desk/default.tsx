import Styled from './index.styles';
import { Item } from '../../../types';
import Loading from '../../Loading';

function Default({
  deskNo,
  isHovering,
  isPassed,
  handleMouseOver,
  handleMouseOut,
  onReserveButtonClick,
  items = [],
  isPendingCreate,
}: {
  deskNo: number;
  isHovering: boolean;
  isPassed: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  items?: Item[];
  onReserveButtonClick: () => void;
  isPendingCreate: boolean;
}) {
  const hoverActive = isHovering && !isPassed;
  return (
    <Styled.Container
      className="default"
      $isHovering={hoverActive}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={hoverActive ? onReserveButtonClick : () => {}}
    >
      {isPendingCreate ? (
        <Loading />
      ) : (
        <>
          {hoverActive && (
            <>
              <p className="text">자리 예약하기</p>

              <Styled.ToolTip>
                <img src="/info_icon.svg" alt="info" />

                <div className="tooltiptext">
                  {items.length
                    ? items.map((item, index) => (
                        <p key={index}>- {convertItems(item)}</p>
                      ))
                    : 'No Item'}
                </div>
              </Styled.ToolTip>
            </>
          )}

          {!hoverActive && <p className="desk-no">{deskNo}</p>}
        </>
      )}
    </Styled.Container>
  );
}

const convertItems = (item: Item): string => {
  switch (item.category) {
    case 'monitor':
      return '모니터';
    case 'arm':
      return '모니터 암';
    case 'charger':
      return 'PD 충전기';
  }
};

export default Default;
