export type BalanceAction = {
   type: 'ADD' | 'SUBTRACT' | 'UNDO';
   amount: number;
}