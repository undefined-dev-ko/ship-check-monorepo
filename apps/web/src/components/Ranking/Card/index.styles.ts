import styled from 'styled-components';
import { COLOR } from '../../../styles/constants';

const Container = styled.div`
  position: relative;
  width: 170px;
  height: 325px;
`;

const Icon = styled.div`
  position: absolute;
  top: 15px;
  left: calc(50% - 25px);
  z-index: 1;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 280px;
  bottom: 0;
  border-radius: 12px;
  background-color: ${COLOR.white};
  font-family: Poppins;

  > * {
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  .profile-img {
    position: absolute;
    top: 30px;
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 16px;
    border: 2px solid #e6e6e6;
  }

  .name {
    position: absolute;
    top: 185px;
    width: 100%;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
  }
  .team {
    position: absolute;
    top: 215px;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
  .count {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    top: 245px;
    width: 100%;

    p {
      font-size: 16px;
      font-weight: 500;
    }
    span {
      font-size: 20px;
      font-weight: 600;
      color: ${COLOR.primaryPurple};
    }
  }
`;

export default { Container, Icon, Content };
