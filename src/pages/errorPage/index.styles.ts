import styled from 'styled-components';
import { COLOR } from '../../styles/constants';

const Container = styled.div`
  background-color: #f4f4f4;
  padding: 80px 80px 120px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 24px;
  padding: 60px;
  background-color: #fff;

  h1 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .buttons {
    display: flex;
    gap: 10px;

    button {
      margin-top: 40px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      background-color: ${COLOR.primaryPurple};
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;

      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
`;

export default { Container, Content };
