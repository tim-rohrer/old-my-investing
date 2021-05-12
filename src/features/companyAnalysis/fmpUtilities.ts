/**
 * Financial Modeling Prep Utilities
 * @author Tim Rohrer
 */
import axios from "axios";
import { SecurityList } from "../securities/securitiesSlice";
import { FMPRequestObject } from "./companyProfilesSlice";

export async function fetchFMPData(requestObject: FMPRequestObject) {
  let { requestType, securitySymbol } = requestObject;
  let domain = "https://financialmodelingprep.com";
  let api = "/api/v3";
  let path = "";
  if (requestType === "companyProfile") {
    path = api + "/company/profile/" + securitySymbol;
  }
  if (requestType === "tradableSymbolsList") {
    path = api + "/available-traded/list/";
  }
  if (requestType === "companiesSymbolsList") {
    path = api + "/stock/list/";
  }
  let url = domain + path;
  try {
    const apiKey = process.env.REACT_APP_FMP_API_KEY;
    url = url + `?apikey=${apiKey}`;
    const result = await axios.get(url);
    if (Object.entries(result.data).length > 0) {
      return result.data;
    } else {
      throw new Error("Symbol not found");
    }
  } catch (error) {
    throw error;
  }
}

// 21 May 09 Written, but not used as it is too slow, and it
// turned out an array is needed for the autocomplete.
// TODO: Rewrite and implement as asynchronous
export function convertFMPTradableSymbolListToBySymbolObject(
  tradableSymbolsListArray: {
    symbol: string;
    name: string;
    price: number;
    exchange: string;
  }[]
) {
  let securityListBySymbol: SecurityList = {};
  tradableSymbolsListArray.forEach((security) => {
    securityListBySymbol = {
      ...securityListBySymbol,
      [security.symbol]: {
        symbol: security.symbol,
        name: security.name,
        exchange: security.exchange,
      },
    };
    return securityListBySymbol;
  });
  return securityListBySymbol;
}
