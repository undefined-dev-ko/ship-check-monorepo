import styled from 'styled-components';
import { media } from '../../styles/media';

const Container = styled.div`
  background-color: #f4f4f4;
  padding: 40px 40px 80px;

  ${media.mobile`
  padding: 25px 20px;
  `};
`;

const MainPageContainer = styled.div`
  margin: 0 auto;
  width: 1280px;
  gap: 20px;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  ${media.mobile`
    width: 100%;
    gap: 20px;
  `};
`;

const ContentHeader = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  gap: 16px;

  background-color: #ffffff;
  border-radius: 24px;

  ${media.mobile`
    padding: 20px;
    border-radius: 12px;
  `};
`;

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
  ContentBody,
};
