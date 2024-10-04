import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 325px;
  object-fit: fill;
  border-radius: 12px;
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
  font-size: 40px;
  // burning effect
  color: #fff;
  text-shadow:
    0px -1px 4px white,
    0px -2px 10px yellow,
    0px -10px 20px #ff8000,
    0px -18px 40px red;
`;

export default {
  Container,
  BackgroundImage,
  Message,
  NameListContainer,
  NameTag,
};
