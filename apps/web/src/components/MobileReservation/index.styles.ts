import styled, { css } from 'styled-components';
import { COLOR } from '../../styles/constants';
import { media } from '../../styles/media';

const Wrapper = styled.div`
  ${media.mobile`
  overflow-x: scroll;
 `};
`;

const Container = styled.div`
  ${media.mobile`
   padding: 20px;
  width: 600px;
  border-radius: 12px;
  background-color: ${COLOR.white};
  `};
`;

const SeatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  & > *:nth-child(2n) {
    ${media.mobile`
    margin-bottom: 20px;
  `};
  }
`;

const SeatList = styled.div`
  ${media.mobile`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  `};
`;

const SeatItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  color: ${COLOR.white};
  cursor: default;
  width: 90px;
  height: 60px;
  max-width: 222.4px;
  max-height: 120px;
  border-radius: 8px;

  .name {
    ${media.mobile`
    font-size: 16px;
    line-height: 20px;
  `};
  }

  .team {
    ${media.mobile`
    font-size: 12px;
    line-height: 20px;
  `};
  }
`;

const EmptySeatItem = styled(SeatItem)`
  background-color: ${COLOR.gray};
`;

const ReserveSeatItem = styled(SeatItem)`
  background-color: ${COLOR.primaryGreen};
  font-size: 16px;
`;

const FixedSeatItem = styled(SeatItem)`
  background-color: ${COLOR.gray};
  font-size: 25px;
`;

const ReservedSeatItem = styled(SeatItem)<{ isMyReservation: boolean }>`
  background-color: ${({ isMyReservation }) =>
    isMyReservation ? COLOR.primaryPurple : '#757cbf'};
`;

const CancelSeatItem = styled(SeatItem)`
  background-color: ${COLOR.primaryRed};
`;

export default {
  Wrapper,
  Container,
  SeatContainer,
  SeatList,
  EmptySeatItem,
  ReserveSeatItem,
  FixedSeatItem,
  ReservedSeatItem,
  CancelSeatItem,
};
