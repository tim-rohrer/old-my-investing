import { SecuritySymbol } from "../securities/securitiesSlice";

export interface Holding {
  securitySymbol: SecuritySymbol;
  name: string;
}
