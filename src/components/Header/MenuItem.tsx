import styled from 'styled-components';
import { COLOR } from '../../styles/constants';
import { media } from '../../styles/media';

const Container = styled.button`
  background-color: ${COLOR.primaryPurple};
  color: #f5f5f5;
  border: 0;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  ${media.mobile`
    padding: 8px 12px;
    font-size: 18px;
  `};
`;

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

function MenuItem(props: MenuItemProps) {
  return <Container onClick={props.onClick}>{props.label}</Container>;
}

export default MenuItem;
