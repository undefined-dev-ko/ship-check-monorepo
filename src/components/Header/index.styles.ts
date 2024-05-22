import styled from 'styled-components';
import { COLOR } from '../../styles/constants';
import { User } from '../../types';

const Container = styled.div`
  width: 100%;
  background-color: ${COLOR.white};
  align-items: center;

  .right-container {
    display: flex;
    gap: 20px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 30px;
  white-space: nowrap;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  .logo-img {
    width: 50px;
    height: 50px;
    background-image: url('/logo.png');
    background-size: cover;
  }
  .logo-txt-en,
  .logo-txt-kr {
    font-size: 30px;
    font-weight: 700;
  }
  .logo-txt-kr {
    color: #6c6c6c;
  }
`;

const ProfileImage = styled.div<{ user?: User }>`
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 100%;
  background-image: url(${({ user }) => user.photo});
  background-size: cover;
`;

export default { Container, Header, Logo, ProfileImage };
