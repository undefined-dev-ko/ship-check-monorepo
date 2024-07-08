import styled from 'styled-components';
import { COLOR } from '../../styles/constants';
import { media } from '../../styles/media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 60px;
  background-color: ${COLOR.white};

  width: 1160px;
  height: 564px;

  ${media.mobile`
   width: 100%;
   height: 100%;
   padding: 20px 0 0 0;
   justify-content: center;
  `};

  .seat-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    ${media.mobile`
 flex-direction: column;
 height: 350px;
  `};

    & > li:nth-child(n + 6):nth-child(-n + 10) {
      margin-bottom: 60px;

      ${media.mobile`
        margin-bottom: 0;
  `};
    }
  }
`;

const TitleDate = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 600;
`;

export default { Container, TitleDate };
