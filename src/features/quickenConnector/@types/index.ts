export interface InvestmentTransaction {
  transactionId: string
  date: Date
  type: string
  action: string
  securityName: string
  securitySymbol: string
  payee: string
  category: string
  commissionFee: number
  sharesOut: number
  sharesIn: number
  shares: number
  cashOut: number
  cashIn: number
  investAmt: number
  amount: number
  account: string
  quickenData: Record<string, string>
}
