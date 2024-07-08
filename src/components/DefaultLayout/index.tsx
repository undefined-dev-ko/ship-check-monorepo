import React from 'react';
import styled from 'styled-components';

const DefaultLayoutWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  min-width: 360px;
`;

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefaultLayoutWrapper>{children}</DefaultLayoutWrapper>
    </>
  );
}

export default DefaultLayout;
