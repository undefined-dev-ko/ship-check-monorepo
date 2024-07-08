import styled from 'styled-components';
import { COLOR } from '../../styles/constants';
import { User } from '../../types';
import { media } from '../../styles/media';

const Container = styled.div`
  width: 100%;
  background-color: ${COLOR.white};
  align-items: center;

  .right-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 30px;
  white-space: nowrap;

  ${media.mobile`
  padding: 12px 15px;
  `};
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

    ${media.mobile`
    width: 25px;
    height: 25px;
  `};
  }

  .logo-txt-en,
  .logo-txt-kr {
    font-size: 30px;
    font-weight: 700;

    ${media.mobile`
      font-size: 18px;
  `};
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

  ${media.mobile`
    width: 25px;
    height: 25px;
  `};
`;

export default { Container, Header, Logo, ProfileImage };
