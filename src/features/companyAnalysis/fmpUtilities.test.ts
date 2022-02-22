import nock from "nock"
import {
  convertFMPTradableSymbolListToBySymbolObject,
  fetchFMPData,
} from "./fmpUtilities"
import axios from "axios"
import { FMPRequestObject } from "./companyProfilesSlice"
import { SecurityList } from "../securities/securitiesSlice"
axios.defaults.adapter = require("axios/lib/adapters/http")

describe("FMP Utilities", () => {
  describe("Company Valuation/Profile", () => {
    const mockedFMPCompanyProfileApple = {
      symbol: "AAPL",
      profile: {
        price: 313.14,
        beta: "1.228499",
        volAvg: "52187498",
        mktCap: "1.35725213E12",
        lastDiv: "3.08",
        range: "170.27-327.85",
        changes: -1.82,
        changesPercentage: "(-0.58%)",
        companyName: "Apple Inc.",
        exchange: "Nasdaq Global Select",
        industry: "Computer Hardware",
        website: "http://www.apple.com",
        description:
          "Apple Inc is designs, manufactures and markets mobile communication and media devices and personal computers, and sells a variety of related software, services, accessories, networking solutions and third-party digital content and applications.",
        ceo: "Timothy D. Cook",
        sector: "Technology",
        image:
          "https://financialmodelingprep.com/images-New-jpg/AAPL.jpg",
      },
    }

    describe("fetchFMPData", () => {
      const scope = nock("https://financialmodelingprep.com")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .persist()

      const apiKey = process.env.REACT_APP_FMP_API_KEY
      let path = `/api/v3/company/profile/AAPL?apikey=${apiKey}`

      it("handles a fmpRequestObject", async () => {
        scope.get(path).reply(200, mockedFMPCompanyProfileApple)

        const fmpRequestObject: FMPRequestObject = {
          requestType: "companyProfile",
          securitySymbol: "AAPL",
        }
        const actual = await fetchFMPData(fmpRequestObject)
        expect(actual.profile.companyName).toEqual(
          mockedFMPCompanyProfileApple.profile.companyName,
        )
      })

      it("handles return of securitySymbol", async () => {
        scope.get(path).reply(200, mockedFMPCompanyProfileApple)

        const fmpRequestObject: FMPRequestObject = {
          requestType: "companyProfile",
          securitySymbol: "AAPL",
        }

        const actual = await fetchFMPData(fmpRequestObject)
        // console.log(actual)

        expect(actual).toEqual(mockedFMPCompanyProfileApple)
      })

      it("handles a request of an unfound symbol", async () => {
        const fmpRequestObject: FMPRequestObject = {
          requestType: "companyProfile",
          securitySymbol: "UNFOUND",
        }
        path = `/api/v3/company/profile/${fmpRequestObject.securitySymbol}?apikey=${apiKey}`
        scope.get(path).reply(200, {})

        expect.assertions(2)
        try {
          await fetchFMPData(fmpRequestObject)
        } catch (e) {
          expect(e).toBeInstanceOf(Error)
          let errorMessage = ""
          if (e instanceof Error) errorMessage = e.message
          expect(errorMessage).toEqual("Symbol not found")
        }
      })

      it("handles return of an error", async () => {
        scope.get(path).reply(500)

        expect.assertions(1)
        try {
          await fetchFMPData({
            requestType: "companyProfile",
            securitySymbol: "AAPL",
          })
        } catch (e) {
          let errorMessage = ""
          if (e instanceof Error) errorMessage = e.message
          expect(errorMessage).toEqual(
            "Request failed with status code 500",
          )
        }
      })
    })
  })

  describe("Convert securities form", () => {
    it("should convert FMP Tradable Symbols List to My Investing Securities List", () => {
      const tradableListFixture = [
        {
          symbol: "SPY",
          name: "SPDR S&P 500",
          price: 415.75,
          exchange: "New York Stock Exchange Arca",
        },
        {
          symbol: "CMCSA",
          name: "Comcast Corp",
          price: 56.41,
          exchange: "Nasdaq Global Select",
        },
      ]
      const myInvestingSecuritiesList: SecurityList = {
        SPY: {
          symbol: "SPY",
          name: "SPDR S&P 500",
          exchange: "New York Stock Exchange Arca",
        },
        CMCSA: {
          symbol: "CMCSA",
          name: "Comcast Corp",
          exchange: "Nasdaq Global Select",
        },
      }

      expect(
        convertFMPTradableSymbolListToBySymbolObject(
          tradableListFixture,
        ),
      ).toStrictEqual(myInvestingSecuritiesList)
    })
  })
})
