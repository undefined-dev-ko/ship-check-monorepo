import styled from 'styled-components';
import { media } from '../../styles/media';

const Container = styled.div`
  display: grid;
  place-content: center;

  .loader {
    position: relative;
    margin: auto;
    width: 3rem;
    border-radius: 100vmin;
    overflow: hidden;
    padding: 1.25rem;

    ${media.mobile`
      padding: 0.5rem;
    `};

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }

  .circular {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    margin: auto;
    transform-origin: center center;
    animation: 2s linear 0s infinite rotate;

    ${media.mobile`
      width: 65%;
      height: 65%;
    `};
  }

  .path {
    stroke: #fff;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: 1.5s ease-in-out 0s infinite dash;
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
      stroke: #fff;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
`;

export default { Container };
