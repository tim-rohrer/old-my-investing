import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../app/store"
import {
  fetchFMPCompanyProfileBySymbol,
  selectCompanyProfile,
  selectProfilesLoaded,
} from "./companyProfilesSlice"
import { convertFMPProfileToMyCompanyProfile } from "./fmpUtilities"

export interface MyCompanyProfile {
  symbol: string
  name: string
  sector: string
  industry: string
  exchange: string
  description: string
  ceo: string
  website: string
}

// type LocalFMPCompanyProfile = FMPCompanySymbol | undefined

const useCompanyProfile = (symbol: string | null) => {
  const [companyProfile, setCompanyProfile] = React.useState<
    MyCompanyProfile | undefined
  >()

  const dispatch: AppDispatch = useDispatch()

  const companyProfilesLoaded = useSelector(selectProfilesLoaded)
  const fmpProfile = useSelector(selectCompanyProfile(symbol))

  React.useEffect(() => {
    if (symbol !== null) {
      if (
        companyProfilesLoaded !== null &&
        companyProfilesLoaded.includes(symbol) &&
        fmpProfile !== undefined
      ) {
        setCompanyProfile(() =>
          convertFMPProfileToMyCompanyProfile(symbol, fmpProfile),
        )
      } else {
        dispatch(
          fetchFMPCompanyProfileBySymbol({
            requestType: "companyProfile",
            securitySymbol: symbol,
          }),
        )
      }
    }
  }, [companyProfilesLoaded, dispatch, fmpProfile, symbol])

  return companyProfile
}

export default useCompanyProfile
