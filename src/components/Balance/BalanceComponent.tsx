import React, { useReducer, useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { BalanceHistory } from '../../app/types/balanceHistory'
import { BalanceAction } from '@/app/types/balanceAction';
import TableComponent from '../table/TableComponent';
import { useBalanceContext } from '@/app/context/AppContext';

const balanceReducer = (state: number, action: BalanceAction) => {
    switch (action.type) {
      case 'ADD':
        return state + action.amount;
      case 'SUBTRACT':
        return state - action.amount;
      case 'UNDO':
        return action.amount;
      default:
        return state;
    }
  };

const BalanceComponent: React.FC = () => {
    const {
        balance,
        balanceHistory,
        costs,
        setCosts,
        income,
        setIncome,
        stepsAmount,
        setStepsAmount,
        dispatch,
        setBalanceHistory,
      } = useBalanceContext();

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(balanceHistory.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return balanceHistory.slice(start, end);
  }, [page, balanceHistory]);

  const handleSubmit = () => {
    if (costs !== '') {
      const costAmount = parseFloat(costs);
    if (!isNaN(costAmount)) {
      setBalanceHistory([...balanceHistory, {saldo: balance - costAmount, change: -costAmount}]);
      dispatch({ type: 'SUBTRACT', amount: costAmount });
      setCosts('');
      setStepsAmount(0);
    }
    } else {
      const incomeAmount = parseFloat(income);
    if (!isNaN(incomeAmount)) {
      setBalanceHistory([...balanceHistory, {saldo: balance + incomeAmount, change: incomeAmount}]);
      dispatch({ type: 'ADD', amount: incomeAmount });
      setIncome('');
      setStepsAmount(0);
    }
    }
    
  };


  const handleUndo = () => {
    if (balanceHistory.length > 0 && (balanceHistory.length - stepsAmount) >= 1) {
      const updatedHistory = [...balanceHistory];
      
      updatedHistory.pop();
      const lastItem = updatedHistory[updatedHistory.length - 1];
      console.log(lastItem)
      if (lastItem) {
        dispatch({ type: 'UNDO', amount: lastItem.saldo }); 
        setBalanceHistory(updatedHistory); 
        setStepsAmount(stepsAmount + 1);
      }
    }
  };

  const handleClear = () => {
    dispatch({ type: 'UNDO', amount: 0 });
    setBalanceHistory([]);
  };
  
  return (
    <>
    <Button onClick={handleClear} className="max-w-[220px] mx-auto p-6 text-white" color="danger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></Button>
    <h1 className="text-center text-3xl text-white font-semibold mt-2">Balance: {balance}</h1><div className="flex flex-row justify-center gap-6 mt-5">
          <div className="flex font-bold">
              <Input
                  value={costs}
                  onChange={(e) => {
                      setIncome('');
                      setCosts(e.target.value);
                  } }
                  size="sm"
                  className="max-w-[220px]"
                  type="number"
                  label="Costs"
                  color="danger" />
          </div>
          <div className="flex font-bold gap-6 items-center flex-col-reverse">
              <Button onClick={handleUndo} className="font-bold text-white" color="warning"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" /></svg></Button>
              <Button onClick={handleSubmit} className="p-3 font-bold text-white" size="lg" color="primary">Proceed</Button>
          </div>
          <div className="flex font-bold">
              <Input size="sm" className="max-w-[220px]"
                  value={income} onChange={(e) => {
                      setCosts('');
                      setIncome(e.target.value);
                  } }
                  labelPlacement="inside"
                  type="number"
                  label="Income"
                  color="success" />
          </div>

      </div><div className="mt-4">
              <TableComponent page={page} pages={pages} items={items} setPage={setPage} />
          </div></>
  );
};

export default BalanceComponent;
