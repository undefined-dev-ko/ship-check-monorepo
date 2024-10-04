import React from 'react';
import Styled from './index.styles';
import { MEMBER_LIST } from './memberList';

interface MemberProps {
  name: string;
  email: string;
}

function Member(props: MemberProps) {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.email}</p>
    </div>
  );
}

function Footer() {
  const leader = MEMBER_LIST.find((e) => e.role === 'leader');
  const members = MEMBER_LIST.filter((e) => e.role !== 'leader');

  return (
    <Styled.Container>
      <Styled.Footer>
        <div className="left-container">
          <Styled.Title>소모임 "입장바꿔 생각해"와 함께해요</Styled.Title>

          <Styled.MemberList>
            <div className="bold">참여</div>

            <dl>
              <div className="member-container">
                <dt className="bold">모임장</dt>

                <dd className="member">{leader && <Member {...leader} />}</dd>
              </div>

              <div className="member-container">
                <dt className="bold">모임원</dt>

                <dd className="member">
                  {members.map((member, i) => (
                    <Member {...member} key={i} />
                  ))}
                </dd>
              </div>
            </dl>
          </Styled.MemberList>
        </div>

        <Styled.CopyRight>
          Copyright 2023. 입장바꿔 생각해. All rights reserved.
        </Styled.CopyRight>
      </Styled.Footer>
    </Styled.Container>
  );
}

export default Footer;
