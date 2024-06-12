import styled from 'styled-components';
import { COLOR } from '../../styles/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 60px;
  background-color: ${COLOR.white};

  width: 1160px;
  height: 564px;

  .seat-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    & > li:nth-child(n + 6):nth-child(-n + 10) {
      margin-bottom: 60px;
    }
  }
`;

const TitleDate = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 600;
`;

export default { Container, TitleDate };
