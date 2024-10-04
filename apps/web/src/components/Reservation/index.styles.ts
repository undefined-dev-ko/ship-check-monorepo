import styled from 'styled-components';
import { COLOR } from '../../styles/constants';
import { media } from '../../styles/media';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${COLOR.white};
  border-radius: 12px;
  padding: 0;
  gap: 30px;

  ${media.mobile`
   padding: 20px;
  `};

  > .meeting-room,
  > .wall {
    padding: 16px;
    background-color: #ddd;
    writing-mode: vertical-rl;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    letter-spacing: -2px;
    word-spacing: 5px;
    color: #999;
    font-weight: 600;
  }

  > .meeting-room {
    border-radius: 12px 0 0 12px;
  }

  > .wall {
    border-radius: 0 12px 12px 0;
  }
`;

const SeatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 30px 0;
  flex: 1;

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
