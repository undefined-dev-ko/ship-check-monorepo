import styled from 'styled-components';
import { COLOR } from '../../styles/constants';
import { media } from '../../styles/media';

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.white};
  word-break: keep-all;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 12px;

  ${media.mobile`
  width: 100%;
  flex-direction: column;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  `};

  .notice-icon {
    width: 40px;
    height: 40px;

    ${media.mobile`
    width: 25px;
    height: 25px;
  `};
  }
`;

function Notice() {
  return (
    <Container>
      <img src="/notice_icon.svg" alt="notice" className="notice-icon" />

      <div>
        <p>
          * FE 팀 매달 마지막 주 목요일 전체 출근 / BE 팀 매달 첫째 주 수요일
          전체 출근
        </p>
      </div>
    </Container>
  );
}

export default Notice;
