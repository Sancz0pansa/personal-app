import { BalanceAction } from "./balanceAction"

export type BalanceHistory = {
    action: {
      type: BalanceAction;
      amount: number;
    }
    saldo: number;
  }
  