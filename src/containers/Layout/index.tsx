import React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      <Header />

      {children}

      <Footer />
    </DefaultLayout>
  );
}

export default Layout;
