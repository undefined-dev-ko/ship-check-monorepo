import React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';

const ContentsContainer = styled.div`
  height: calc(100vh - 363px);
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
