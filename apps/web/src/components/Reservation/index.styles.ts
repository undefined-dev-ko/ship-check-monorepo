import styled from 'styled-components';
import { COLOR } from '../../styles/constants';
import { media } from '../../styles/media';

const Container = styled.div`
  background-color: ${COLOR.white};
  border-radius: 24px;
  padding: 40px;

  ${media.mobile`
   padding: 20px;
  `};
`;

const SeatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  & > *:nth-child(2n) {
    margin-bottom: 60px;
    ${media.mobile`
        margin-bottom: 20px;
  `};
  }

  ${media.mobile`
  // @see https://mingg123.tistory.com/223
  // #학습 align-items center 가 적용되면 왼쪽이 짤린다. 따라서 start 적용 (스크롤 시작점이 잘못적용되는 이슈)
  align-items: start;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  `};
`;

const SeatList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  ${media.mobile`
    flex-wrap: nowrap;
  `};
`;

const TitleDate = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 600;
`;

export default { Container, SeatContainer, SeatList, TitleDate };
