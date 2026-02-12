import styled from "styled-components";

export const PopoverAnchor = styled.div`
  position: fixed;
  pointer-events: none;
`;

export const PopoverTarget = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

export const PopoverWrapper = styled.div`
  min-width: 240px;
  max-width: 360px;
  padding: 10px 12px;
  color: #1f2933;
  background: #fff;
  border: 1px solid #d6d9de;
  border-radius: 8px;
  box-shadow: 0 12px 30px rgb(16 24 40 / 18%);
  pointer-events: auto;
`;

export const Title = styled.div`
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eaedf1;
  font-weight: 700;
  line-height: 1.3;
`;

export const LineItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const LineItem = styled.li`
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 8px;
  font-size: 12px;
  line-height: 1.45;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const Label = styled.div`
  color: #52606d;
  font-weight: 600;
`;

export const Value = styled.div`
  color: #1f2933;
  overflow-wrap: anywhere;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eaedf1;
`;
