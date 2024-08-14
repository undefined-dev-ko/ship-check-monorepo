import styled from 'styled-components';
import { media } from '../../styles/media';

const Container = styled.div`
  padding: 40px 40px 80px;
  min-height: 100%;

  ${media.mobile`
  padding: 25px 20px;
  `};
`;

const MainPageContainer = styled.div`
  margin: 0 auto;
  width: 1280px;
  gap: 30px;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  ${media.mobile`
    width: 100%;
    gap: 20px;
  `};
`;

const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${media.mobile`
  justify-content: center;
   `};
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 20px;

  /* width: 100%; */
  height: 100%;
  ${media.mobile`
      display: none;
   `};
`;

const HeaderRight = styled.div``;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;

  border-radius: 24px;
  padding: 60px;

  ${media.mobile`
   padding: 20px 10px;
   border-radius: 12px;
  `};
`;

export default {
  Container,
  MainPageContainer,
  ContentHeader,
  HeaderLeft,
  HeaderRight,
  ContentBody,
};
