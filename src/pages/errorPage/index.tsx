import Styled from './index.styles';
import Layout from '../../containers/Layout';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

function ErrorPage({
  error,
  resetErrorBoundary,
}: {
  error: AxiosError;
  resetErrorBoundary: () => void;
}) {
  const navigate = useNavigate();
  const { title, content } = getErrorMessage(error.response?.status);

  const handleClick = () => {
    navigate('/');
    resetErrorBoundary();
  };
  const openSpreadSheet = () =>
    window.open(
      'https://docs.google.com/spreadsheets/d/1CpJDwPEaRsbhmUHu-PmTEjWXKzZgAO7uD7HzAX7SwbM/edit#gid=0',
    );

  return (
    <Layout>
      <Styled.Container>
        <Styled.Content>
          <h1>{title}</h1>
          <p>{content}</p>

          <div className="buttons">
            <button onClick={openSpreadSheet}>스프레드 시트로 이동</button>
            <button type="button" onClick={handleClick}>
              홈으로 이동
            </button>
          </div>
        </Styled.Content>
      </Styled.Container>
    </Layout>
  );
}

const getErrorMessage = (status: number) => {
  switch (status) {
    case 401:
      return {
        title: '접근 권한이 없습니다.',
        content: '로그인을 해주세요.',
      };
    case 409:
    case 500:
    default:
      return {
        title: '서비스에 접속할 수 없습니다.',
        content: '새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.',
      };
  }
};

export default ErrorPage;
