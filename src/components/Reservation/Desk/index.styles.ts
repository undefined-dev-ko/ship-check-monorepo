import styled, { css } from 'styled-components';
import { COLOR } from '../../../styles/constants';
import { media } from '../../../styles/media';

const Container = styled.li<{ $isHovering?: boolean; isMine?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 222.4px;
  height: 120px;
  border-radius: 16px;
  color: ${COLOR.white};
  cursor: default;

  background-color: ${(props) =>
    props.isMine && !props.$isHovering ? `#3443c9` : ''};

  ${media.mobile`
  width: 90px;
  height: 60px;
  max-width: 222.4px;
  max-height: 120px;
  border-radius: 8px;
  `};

  .text {
    font-weight: 600;
    line-height: 30px;
  }
  .name {
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;

    ${media.mobile`
      font-size: 16px;
    line-height: 20px;
  `};
  }
  .team {
    font-weight: 500;
    line-height: 30px;

    ${media.mobile`
    font-size: 12px;
    line-height: 20px;
  `};
  }

  &.fixed {
    background-color: ${COLOR.primaryGray};
  }

  &.reserved {
    ${(props) => {
      if (!props.isMine)
        return css`
          background: #757cbf;
        `;

      if (props.$isHovering)
        return css`
          background: ${COLOR.primaryRed};
          cursor: pointer;
        `;

      return css`
        background: ${COLOR.primaryPurple};
        cursor: pointer;
      `;
    }}
  }

  &.default {
    ${(props) =>
      props.$isHovering
        ? `background: ${COLOR.primaryGreen}; cursor: pointer;`
        : `background: #eee;`}
  }

  .desk-no {
    font-size: 38px;
    font-weight: 400;
    color: #fcfcfc;

    ${media.mobile`
    font-size: 25px;
  `};
  }
`;

const ToolTip = styled.div`
  position: relative;

  .tooltiptext {
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, 10%);

    white-space: nowrap;
    background-color: #212121;
    box-shadow: 0px 2px 6px 2px #00000026;
    border-radius: 3px;
    padding: 12px;
    font-weight: 400;
    line-height: 20px;

    visibility: hidden;
  }

  .tooltiptext::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translate(-50%, 10%);

    border: 5px solid transparent;
    border-bottom-color: #212121;
    border-top: 0;
  }

  &:hover .tooltiptext {
    visibility: visible;
  }
`;

export default { Container, ToolTip };
