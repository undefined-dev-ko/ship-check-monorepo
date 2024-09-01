import Styled from './index.styles';

type ElmoJudgementProps = {
  nameList: string[];
};

function ElmoJudgement(props: ElmoJudgementProps) {
  const { nameList } = props;
  return (
    <Styled.Container>
      <Styled.NameListContainer>
        {nameList &&
          nameList.map((name, index) => (
            <Styled.NameTag key={index}>{name}</Styled.NameTag>
          ))}
      </Styled.NameListContainer>
      <Styled.Message>당신은 약속을 소중히 하지 않았지!!! </Styled.Message>
      <Styled.BackgroundImage src="/elmosang.gif" alt="" />
    </Styled.Container>
  );
}

export default ElmoJudgement;
