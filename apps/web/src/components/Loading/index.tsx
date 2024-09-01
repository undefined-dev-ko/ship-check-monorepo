import Styled from './index.styles';

function Loading() {
  return (
    <Styled.Container>
      <div className="loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle
            className="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="3"
            stroke-miterlimit="10"
          ></circle>
        </svg>
      </div>
    </Styled.Container>
  );
}

export default Loading;
