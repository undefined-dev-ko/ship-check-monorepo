import Styled from './index.styles';
import { Item } from '../../../types';

function Default({
  deskNo,
  isHovering,
  handleMouseOver,
  handleMouseOut,
  onReserveButtonClick,
  items = [],
}: {
  deskNo: number;
  isHovering: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  items?: Item[];
  onReserveButtonClick: () => void;
}) {
  return (
    <Styled.Container
      className="default"
      $isHovering={isHovering}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onReserveButtonClick}
    >
      {isHovering && (
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

      {!isHovering && <p className="desk-no">{deskNo}</p>}
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
