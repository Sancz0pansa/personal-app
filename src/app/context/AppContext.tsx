"use client"
import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { BalanceAction } from '../types/balanceAction';

interface BalanceContextType {
  balance: number;
  balanceHistory: any[]; // Adjust type as needed
  costs: string;
  setCosts: React.Dispatch<React.SetStateAction<string>>;
  income: string;
  setIncome: React.Dispatch<React.SetStateAction<string>>;
  stepsAmount: number;
  setStepsAmount: React.Dispatch<React.SetStateAction<number>>;
  dispatch: React.Dispatch<BalanceAction>;
  setBalanceHistory: React.Dispatch<React.SetStateAction<any[]>>; // Adjust type as needed
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const useBalanceContext = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalanceContext must be used within a BalanceProvider');
  }
  return context;
};

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

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, dispatch] = useReducer(balanceReducer, 0);
  const [balanceHistory, setBalanceHistory] = useState<any[]>([]); // Adjust type as needed
  const [costs, setCosts] = useState('');
  const [income, setIncome] = useState('');
  const [stepsAmount, setStepsAmount] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true); 

  useEffect(() => {
    const storedData = localStorage.getItem('balanceData');
    if (storedData) {
      const { balance: storedBalance, balanceHistory: storedBalanceHistory } = JSON.parse(storedData);
      dispatch({ type: 'UNDO', amount: storedBalance });
      setBalanceHistory(storedBalanceHistory);
    }
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (!isFirstRender) { 
      localStorage.setItem('balanceData', JSON.stringify({ balance, balanceHistory }));
    }
  }, [balance, balanceHistory, isFirstRender]);



  const value: BalanceContextType = {
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
  };

  return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
};
