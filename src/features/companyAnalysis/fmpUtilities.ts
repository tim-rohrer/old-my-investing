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
    console.log(url);
    const result = await axios.get(url);
    if (Object.entries(result.data).length > 0) {
      console.log(result.data);
      return result.data;
    } else return "Hello";
  } catch (error) {
    // console.log("Error: ", error);
    return error;
  }
}
