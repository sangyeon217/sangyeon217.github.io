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

  tr:hover {
    color: #ffffff;
    background-color: #5a9bd8;
  }

  th {
    border: 1px solid #c0d6e4;
    padding: 0.75rem;
    min-width: 120px;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    background-color: #4682b4;
  }

  td {
    border: none;
    box-shadow: inset 0 0 0 0.5px #c0d6e4;
    padding: 0.75rem;
    min-width: 120px;
    text-align: center;
  }
`;

export default function Table({ children, ...props }: TableProps) {
  return (
    <TableContainer>
      <TableComponent {...props}>{children}</TableComponent>
    </TableContainer>
  );
}
