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

  ${media.mobile`
  width: 100%;
  flex-direction: column;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  gap: 10px;
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
          최대 2주(이번주 포함)까지만 예약 가능해요. 고정 or 팀 정기 출근의
          경우는 2주 이후의 날짜도 미리 작성 가능 합니다.
        </p>
        <p>
          (FE팀 매달 마지막주 목요일 전체 출근 / BE팀 매달 첫째주 목요일 전체
          출근)
        </p>
      </div>
    </Container>
  );
}

export default Notice;
