'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BalanceAction } from '../types/balanceAction';

interface BalanceContextType {
  balances: { [key: string]: number };
  balanceHistories: { [key: string]: any[] };
  dispatch: (key: string, action: BalanceAction) => void;
  handleAddBalance: (name: string) => void;
  globalBalance: number;
  deleteBalance: (key: string) => void;
}
console.log(true)
const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const useBalanceContext = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalanceContext must be used within a BalanceProvider');
  }
  return context;
};

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balances, setBalances] = useState<{ [key: string]: number }>(() => {
    const savedBalances = localStorage.getItem('balances');
    return savedBalances ? JSON.parse(savedBalances) : {};
  });

  const [balanceHistories, setBalanceHistories] = useState<{ [key: string]: any[] }>(() => {
    const savedHistories = localStorage.getItem('balanceHistories');
    return savedHistories ? JSON.parse(savedHistories) : {};
  });


  
  const [globalBalance, setGlobalBalance] = useState<number>(0)

  useEffect(() => {
    if (Object.values(balances).length > 0) {
      const value = Object.values(balances).reduce((a,b) => a + b);
    setGlobalBalance(value);
    }
    
  }, [balances])

  const handleAddBalance = (name: string) => {
    setBalances({ ...balances, [name]: 0 });
    setBalanceHistories({ ...balanceHistories, [name]: [] }); 
  };

  const dispatch = (key: string, action: BalanceAction) => {
    setBalances((prev) => {
      const updated = { ...prev };
      switch (action.type) {
        case 'ADD':
          updated[key] = (updated[key] || 0) + action.amount;
          break;
        case 'SUBTRACT':
          updated[key] = (updated[key] || 0) - action.amount;
          break;
        case 'UNDO':
          updated[key] = action.amount;
          break;
        default:
          break;
      }
      localStorage.setItem('balances', JSON.stringify(updated));
      return updated;
    });

    setBalanceHistories((prev) => {
      const updated = { ...prev };

      if (action.type === 'UNDO') {
        updated[key] = [];
        localStorage.setItem('balanceHistories', JSON.stringify(updated));
        return updated;
      }

      updated[key] = [...(updated[key] || []), { action: {...action, amount: action.type === 'SUBTRACT' ? -action.amount : action.amount}, saldo: balances[key] + (action.type === 'SUBTRACT' ? -action.amount : action.amount) }];
      localStorage.setItem('balanceHistories', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteBalance = (key: string) => {
    setBalances((prevBalances) => {
      const updatedBalances = { ...prevBalances };
      delete updatedBalances[key];
      localStorage.setItem('balances', JSON.stringify(updatedBalances));
      return updatedBalances;
    });

    setBalanceHistories((prevHistories) => {
      const updatedHistories = { ...prevHistories };
      delete updatedHistories[key];
      localStorage.setItem('balanceHistories', JSON.stringify(updatedHistories));
      return updatedHistories;
    });
  };

  const value: BalanceContextType = {
    balances,
    balanceHistories,
    dispatch,
    handleAddBalance,
    globalBalance,
    deleteBalance,
  };

  return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
};
