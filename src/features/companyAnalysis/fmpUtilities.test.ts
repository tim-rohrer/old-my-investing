import nock from "nock";
import { fetchFMPData } from "./fmpUtilities";
import axios from "axios";
import { FMPRequestObject } from "./types";
axios.defaults.adapter = require("axios/lib/adapters/http");

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
        image: "https://financialmodelingprep.com/images-New-jpg/AAPL.jpg",
      },
    };
    describe("fetchFMPData", () => {
      const scope = nock("https://financialmodelingprep.com")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .log(console.log);

      it("handles a fmpRequestObject", async () => {
        scope
          .get("/api/v3/company/profile/AAPL")
          .reply(200, mockedFMPCompanyProfileApple);

        const fmpRequestObject: FMPRequestObject = {
          requestType: "companyProfile",
          securitySymbol: ["AAPL"],
        };
        const actual = await fetchFMPData(fmpRequestObject);

        expect(actual).toEqual(mockedFMPCompanyProfileApple);
      });

      it("handles return of securitySymbol", async () => {
        scope
          .get("/api/v3/company/profile/AAPL")
          .reply(200, mockedFMPCompanyProfileApple);

        const fmpRequestObject = {
          requestType: "companyProfile",
          securitySymbol: ["AAPL"],
        };

        const actual = await fetchFMPData(fmpRequestObject);
        // console.log(actual)

        expect(actual).toEqual(mockedFMPCompanyProfileApple);
      });
      it("handles a request of an unfound symbol", async () => {
        const fmpRequestObject: FMPRequestObject = {
          requestType: "companyProfile",
          securitySymbol: ["UNFOUND"],
        };

        scope
          .get("/api/v3/company/profile/" + fmpRequestObject.securitySymbol[0])
          .reply(200, {});

        const actual = await fetchFMPData(fmpRequestObject);

        expect(actual).toEqual("Hello");
      });
      it("handles return of an error", async () => {
        scope.get("/error").reply(404);

        const actual = await fetchFMPData("AAPL");

        expect(actual).toThrowError;
      });
    });
  });
  describe("Company Valuation/Quote", () => {});
});
