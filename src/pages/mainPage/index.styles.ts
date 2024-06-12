import styled from 'styled-components';

const Container = styled.div`
  background-color: #f4f4f4;
  padding: 80px 80px 120px;
  gap: 80px;
`;

const MainPageContainer = styled.div`
  margin: 0 auto;
  width: 1280px;
  gap: 40px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
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
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  height: 896px;

  border-radius: 24px;
  padding: 60px;
`;

export default { Container, MainPageContainer, ContentHeader, ContentBody };
