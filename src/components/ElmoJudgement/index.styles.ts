import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 310px;
  object-fit: fill;
  border-radius: 24px;
`;

const Message = styled.p`
  position: absolute;
  top: 40%;
  left: 51%;
  transform: translateX(-50%);
  color: #ffffff;
`;

const NameListContainer = styled.div`
  width: 100%;

  position: absolute;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`;

const NameTag = styled.div`
  font-size: 30px;
  color: yellow;
`;

export default {
  Container,
  BackgroundImage,
  Message,
  NameListContainer,
  NameTag,
};
