import styled from 'styled-components';
import { media } from '../../styles/media';

const DayBox = styled.div`
  width: 54px;
  height: 54px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #b3b3b3;

  ${media.mobile`
    width: 30px;
    height: 30px;
    font-size: 18px;
  `};
`;

export default { DayBox };
