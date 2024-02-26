import React from 'react';
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { BalanceHistory } from '../../app/types/balanceHistory'

interface TableComponentProps {
  page: number;
  setPage: (page: number) => void;
  pages: number;
  items: BalanceHistory[];
}

const TableComponent: React.FC<TableComponentProps> = ({ page, pages, items, setPage }) => {
  return (
    <>
    <Table className="max-w-[300px] h-72 mx-auto text-center " removeWrapper aria-label="Example static collection table"
    bottomContent={
      pages > 1 && <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="warning"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    }
    classNames={{
      wrapper: "min-h-[222px]",
    }}
    >
      <TableHeader >
        <TableColumn className='text-center'>BALANCE</TableColumn>
        <TableColumn className='text-center'>CHANGE</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={items}>
      {items.map((item: BalanceHistory, index) => (
        <TableRow className='' key={index} style={{ backgroundColor: item.action.amount > 0 ? 'rgba(50, 205, 50, 0.2)' : 'rgba(255, 99, 71, 0.2)' }}>
          <TableCell>{item.saldo}</TableCell>
          <TableCell>{item.action.amount}</TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
      
    </>
  );
};

export default TableComponent;
