import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

type TableProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLQuoteElement>;

const TableContainer = styled.div`
  border-radius: 8px;
  margin-bottom: 1.5rem;
  padding: 1px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const TableComponent = styled.table`
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  margin: 1.5rem 0;
  font-size: 1rem;

  tr:first-child th:first-child {
    border-top-left-radius: 8px;
  }

  tr:first-child th:last-child {
    border-top-right-radius: 8px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }
`;

const TableHeadComponent = styled.thead``;
const TableBodyComponent = styled.tbody``;

export default function Table({ children, ...props }: TableProps) {
  const tableHead = children[0];
  const tableBody = children.slice(1);

  return (
    <TableContainer>
      <TableComponent {...props}>
        <TableHeadComponent>{tableHead}</TableHeadComponent>
        <TableBodyComponent>{tableBody}</TableBodyComponent>
      </TableComponent>
    </TableContainer>
  );
}
