'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React, { useState, useReducer } from "react";
import { BalanceAction } from './types/balanceAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BalanceHistory } from "./types/balanceHistory";
import TableComponent from "@/components/table/TableComponent";
import BalanceComponent from "@/components/Balance/BalanceComponent";
import NewBalanceComponent from "@/components/NewBalance/NewBalanceComponent";
import { useBalanceContext } from "./context/AppContext";





export default function Home() {
  const { balances, globalBalance } = useBalanceContext();

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 font-['Anta']">
        <h1 className="text-5xl">{'Global balance: ' + globalBalance}</h1>
        <div className="bg-gray-600 w-4/5 mt-5 min-h-[75vh] rounded-lg p-5">
        <Tabs variant='solid' className="" color="warning" aria-label="Tabs variants">
        {Object.keys(balances).map((balanceName, index) => (
            <Tab key={balanceName} className="font-bold" title={balanceName}>
            <Card className="bg-transparent p-5">
              <CardBody  >
                <BalanceComponent balanceKey={balanceName}/>
              </CardBody>
            </Card>
            </Tab> 
          ))}
          <Tab key="videos" className="text-[27px] font-bold" title="+">
            <Card className="bg-transparent p-5">
              <CardBody  >
                <NewBalanceComponent />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
          
        </div>
        
      </main>
  );
}
