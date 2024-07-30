import styled from 'styled-components';
import { media } from '../../styles/media';

const DateBox = styled.div`
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.mobile`
    width: 30px;
    height: 30px;

  `};

  .date {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 42px;
    color: #1b1b1b;
    border-radius: 23%;

    ${media.mobile`
      width: 30px;
    height: 30px;
    font-size: 18px;
  `};
  }
`;

export default { DateBox };
