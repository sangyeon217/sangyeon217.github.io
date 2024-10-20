import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

type TableRowProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLQuoteElement>;

const TableRowComponent = styled.tr`
  &:hover {
    color: #ffffff;
    background-color: #5a9bd8;
  }
`;

export default function TableRow({ children, ...props }: TableRowProps) {
  return <TableRowComponent {...props}>{children}</TableRowComponent>;
}
