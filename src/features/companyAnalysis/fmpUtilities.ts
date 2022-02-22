/**
 * Financial Modeling Prep Utilities
 * @author Tim Rohrer
 */
import axios from "axios"
import {
  SecurityList,
  SecuritySymbol,
} from "../securities/securitiesSlice"
import { FMPRequestObject } from "./companyProfilesSlice"
import { MyCompanyProfile } from "./useCompanyProfile"

export interface FMPCompanyProfile {
  symbol: string
  profile: {
    price: number
    beta: number
    volAvg: number
    mktCap: number
    lastDiv: number
    range: string
    changes: number
    companyName: string
    currency: string
    cik: string
    isin: string
    cusip: string
    exchange: string
    exchangeShortName: string
    industry: string
    website: string
    description: string
    ceo: string
    sector: string
    country: string
    fullTimeEmployees: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
    dcfDiff: number
    dcf: number
    image: string
    ipoDate: string
    defaultImage: boolean
    isEtf: boolean
    isActivelyTrading: boolean
  }
}

export async function fetchFMPData(requestObject: FMPRequestObject) {
  const { requestType, securitySymbol } = requestObject
  const domain = "https://financialmodelingprep.com"
  const api = "/api/v3"
  let path = ""
  if (requestType === "companyProfile") {
    path = api + "/company/profile/" + securitySymbol
  }
  if (requestType === "tradableSymbolsList") {
    path = api + "/available-traded/list/"
  }
  if (requestType === "companiesSymbolsList") {
    path = api + "/stock/list/"
  }
  let url = domain + path
  const apiKey = process.env.REACT_APP_FMP_API_KEY
  url = url + `?apikey=${apiKey}`
  const result = await axios.get(url)
  if (Object.entries(result.data).length > 0) {
    return result.data
  } else {
    throw new Error("Symbol not found")
  }
}

export const convertFMPProfileToMyCompanyProfile = (
  symbol: SecuritySymbol,
  fmpCompanyProfile: FMPCompanyProfile,
): MyCompanyProfile => {
  const {
    companyName,
    sector,
    industry,
    exchange,
    description,
    ceo,
    website,
  } = fmpCompanyProfile.profile
  return {
    symbol,
    name: companyName,
    sector,
    industry,
    exchange,
    description,
    ceo,
    website,
  } as MyCompanyProfile
}

// 21 May 09 Written, but not used as it is too slow, and it
// turned out an array is needed for the autocomplete.
// TODO: Rewrite and implement as asynchronous
export function convertFMPTradableSymbolListToBySymbolObject(
  tradableSymbolsListArray: {
    symbol: string
    name: string
    price: number
    exchange: string
  }[],
) {
  let securityListBySymbol: SecurityList = {}
  tradableSymbolsListArray.forEach((security) => {
    securityListBySymbol = {
      ...securityListBySymbol,
      [security.symbol]: {
        symbol: security.symbol,
        name: security.name,
        exchange: security.exchange,
      },
    }
    return securityListBySymbol
  })
  return securityListBySymbol
}
