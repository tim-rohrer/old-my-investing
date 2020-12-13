/**
 * Financial Modeling Prep Utilities
 * @author Tim Rohrer
 */
import axios from "axios";
import { FMPRequestObject } from "./companyProfilesSlice";

export async function fetchFMPData(requestObject: FMPRequestObject) {
  let { requestType, securitySymbol } = requestObject;
  let domain = "https://financialmodelingprep.com";
  let api = "/api/v3";
  let path = "";
  if (requestType === "companyProfile") {
    path = api + "/company/profile/" + securitySymbol;
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
