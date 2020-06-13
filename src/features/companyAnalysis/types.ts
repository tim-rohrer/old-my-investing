import { SecuritySymbol } from "../portfolio/types";

export interface FMPRequestObject {
    requestType: "companyProfile"
    securitySymbol: Array<SecuritySymbol>
}