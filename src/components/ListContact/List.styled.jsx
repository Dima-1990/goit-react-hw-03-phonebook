import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  border: 3px solid #000;
  list-style: none;
`;

export const Item = styled.li`
  background-color: #fff;
  border: 1px solid #000;
  padding: 6px;
  border-radius: 8px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
`;

export const Button = styled.button`
  padding: 2px 8px;
  font: inherit;
  cursor: pointer;
  border-radius: 8px 8px;
  border: 2px solid #000;
  background-color: #fff;
`;
