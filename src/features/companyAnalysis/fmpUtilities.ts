/**
 * Financial Modeling Prep Utilities
 * @author Tim Rohrer
 */
import { SecuritySymbol } from "../portfolio/types"
import axios from 'axios'
import { FMPRequestObject } from "./types"

 export async function fetchFMPData(requestObject: FMPRequestObject) {
    let { requestType, securitySymbol } = requestObject
    let domain = "https://financialmodelingprep.com"
    let api = "/api/v3"
    let path = ""
    if (requestType === "companyProfile") {
        path = api + "/company/profile/" + securitySymbol
    }
    let url = domain + path
    try {
         const result = await axios.get(url)
         if ( Object.entries(result.data).length > 0) {
             return result.data
         } else return "Hello"
     }
     catch (error) {
         return error
     }
 }