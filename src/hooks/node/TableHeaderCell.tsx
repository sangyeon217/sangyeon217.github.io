import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

type TableHeaderCellProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLQuoteElement>;

const TableHeaderCellComponent = styled.th`
  border: 1px solid #c0d6e4;
  padding: 0.75rem;
  min-width: 120px;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background-color: #4682b4;
`;

export default function TableHeaderCell({
  children,
  ...props
}: TableHeaderCellProps) {
  return (
    <TableHeaderCellComponent {...props}>{children}</TableHeaderCellComponent>
  );
}
