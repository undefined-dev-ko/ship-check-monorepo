import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;

  .slick-slider {
    .arrow-icon {
      position: absolute;
      top: calc(50% + 15px);
      cursor: pointer;
      z-index: 1;
    }

    .left-arrow {
      left: -30px;
    }

    .right-arrow {
      right: -30px;
    }
  }

  .slick-list {
    width: 850px;
    height: 325px;
  }
`;

export default { Container };
