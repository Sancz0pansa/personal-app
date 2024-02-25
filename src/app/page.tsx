'use client'
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React, { useState, useReducer } from "react";
import { BalanceAction } from './types/balanceAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BalanceHistory } from "./types/balanceHistory";
import TableComponent from "@/components/table/TableComponent";
import BalanceComponent from "@/components/Balance/BalanceComponent";





export default function Home() {


  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-gray-600 w-4/5 min-h-96 rounded-lg p-5">
        <Tabs variant='bordered' className="" color="primary" aria-label="Tabs variants">
          <Tab key="photos" title="Photos">
          <Card className="bg-transparent p-5">
            <CardBody  >
              <BalanceComponent/>
            </CardBody>
          </Card>
          </Tab>  
          <Tab key="music" title="Music">
          <Card className="bg-transparent p-5">
            <CardBody  >
              <BalanceComponent/>
            </CardBody>
          </Card>
          </Tab>
          <Tab key="videos" title="Videos"/>
        </Tabs>
          
        </div>
        
      </main>
  );
}
