import React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const ContentsContainer = styled.div`
  min-height: calc(100vh - 363px);
  background-color: #f4f4f4;
`;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      <Header />

      <ContentsContainer>{children}</ContentsContainer>

      <Footer />
    </DefaultLayout>
  );
}

export default Layout;
