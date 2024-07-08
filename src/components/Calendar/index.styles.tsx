import styled from 'styled-components';
import { media } from '../../styles/media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 16px;
`;

const Header = styled.div`
  font-family: Poppins;
  font-size: 40px;
  font-weight: 600;
  line-height: 60px;
  text-align: center;

  ${media.mobile`
    font-size: 20px;
    line-height: 1.5;
  `};
`;

const Content = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  ${media.mobile`
    gap: 12px;
  `};
`;

const FlexHorizontal = styled.div`
  display: flex;
  flex-direction: row;

  ${media.mobile`
    & + & {
    margin-top: 4px;
  }
  `};
`;

const RoundBox = styled.div`
  width: 58px;
  height: 58px;
  box-sizing: border-box;
  background: #ffffff;
  border: 3px solid #f6f6f6;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${media.mobile`
    width: 30px;
    height: 30px;
    border-radius: 6px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  `};

  > svg {
    width: 12px;
    height: 20px;

    ${media.mobile`
      width: 8px;
      height: 18px;
  `};
  }
`;

export default {
  Container,
  Header,
  Content,
  FlexHorizontal,
  RoundBox,
};
