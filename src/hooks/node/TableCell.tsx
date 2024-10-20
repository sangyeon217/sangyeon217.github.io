import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

type TableCellProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLQuoteElement>;

const TableCellComponent = styled.td`
  border: none;
  box-shadow: inset 0 0 0 0.5px #c0d6e4;
  padding: 0.75rem;
  min-width: 120px;
  text-align: center;
`;

export default function TableCell({ children, ...props }: TableCellProps) {
  return <TableCellComponent {...props}>{children}</TableCellComponent>;
}
