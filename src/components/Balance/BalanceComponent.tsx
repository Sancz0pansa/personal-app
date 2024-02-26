'use client'
import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { BalanceAction } from '../../app/types/balanceAction';
import { useBalanceContext } from '@/app/context/AppContext';
import TableComponent from '../table/TableComponent';

const BalanceComponent: React.FC<{ balanceKey: string }> = ({ balanceKey }) => {
  const { balances, balanceHistories, dispatch, deleteBalance } = useBalanceContext();
  const balance = balances[balanceKey] || 0;
  const history = balanceHistories[balanceKey] || [];

  const reversedHistory = [...history].reverse();

  const [selectedPage, setSelectedPage] = useState(1);

  const [costs, setCosts] = useState('');
  const [income, setIncome] = useState('');

  const itemsPerPage = 5;
  const startIndex = (selectedPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = reversedHistory.slice(startIndex, endIndex);

  const pages = Math.ceil(history.length / itemsPerPage);
  const handleSubmit = () => {
    if (costs !== '') {
      const costAmount = parseFloat(costs);
      if (!isNaN(costAmount)) {
        dispatch(balanceKey, { type: 'SUBTRACT', amount: costAmount });
        setCosts('');
      }
    } else {
      const incomeAmount = parseFloat(income);
      if (!isNaN(incomeAmount)) {
        dispatch(balanceKey, { type: 'ADD', amount: incomeAmount });
        setIncome('');
      }
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const updatedHistory = [...history];
      const lastItem = updatedHistory.pop();
      if (lastItem) {
        dispatch(balanceKey, { type: 'UNDO', amount: lastItem.saldo });
      }
    }
  };

  const handleClear = () => {
    dispatch(balanceKey, { type: 'UNDO', amount: 0 });
  };
  
  return (
    <>
      <Button onClick={() => deleteBalance(balanceKey)} className="max-w-[220px] mx-auto p-6 text-white mr-0" color="danger">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
      </Button>
      <Button onClick={handleClear} className="max-w-[220px] mx-auto p-6 text-white font-bold" color="primary">
      CLEAR
      </Button>
      <h1 className="text-center text-3xl text-white font-semibold mt-2">Balance: {balance}</h1>
      <div className="flex flex-row justify-center gap-6 mt-5">
        <div className="flex font-bold">
          <Input
            value={costs}
            onChange={(e) => {
              setIncome('');
              setCosts(e.target.value)}}
            size="sm"
            className="max-w-[220px]"
            type="number"
            label="Costs"
            color="danger"
          />
        </div>
        <div className="flex font-bold gap-6 items-center flex-col-reverse">
          <Button onClick={handleUndo} className="font-bold text-white" color="warning">
            Undo
          </Button>
          <Button onClick={handleSubmit} className="p-3 font-bold text-white" size="lg" color={costs !== '' ? 'danger' : 'success'}>
            Proceed
          </Button>
        </div>
        <div className="flex font-bold">
          <Input
            size="sm"
            className="max-w-[220px]"
            value={income}
            onChange={(e) => {
              setCosts('');
              setIncome(e.target.value)}}
            type="number"
            label="Income"
            color="success"
          />
        </div>
      </div>
      <div className="mt-4">
        <TableComponent pages={pages} items={currentItems} setPage={setSelectedPage} page={selectedPage}/>
      </div>
    </>
  );
};

export default BalanceComponent;
