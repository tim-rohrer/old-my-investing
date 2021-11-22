import { cleanup } from "../../test-utils";
import { FMPRequestObject } from "../companyAnalysis/companyProfilesSlice";
import securities, {
  securityAdded,
  securityUpdated,
  securitySymbolChanged,
  securityRemoved,
  fetchFMPTradableSymbolsList,
} from "./securitiesSlice";
import * as functions from "./securitiesSlice";

afterEach(cleanup);

describe("Securities", () => {
  const amazon = {
    symbol: "AMZ",
    name: "Amazon, Inc.",
  };

  const dicks = {
    symbol: "DKS",
    name: "Dick's Sporting Goods, Inc.",
  };

  const spg = {
    symbol: "SPG",
    name: "Simons Property Group",
  };
  describe("Reducer", () => {
    it("should return the initial state", () => {
      expect(securities(undefined, { type: "@@INIT" } as any)).toEqual({
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      });
    });

    it("should handle securityAdded", () => {
      const testState = {};
      const testPayload = {
        symbol: "DKS",
        name: "Dick's Sporting Goods, Inc.",
      };
      const expectedMatch = {
        securities: {
          DKS: dicks,
        },
      };

      const actionCreator = securityAdded;

      const testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toMatchObject(expectedMatch);
    });

    it("should handle securityAdded and making sure the the symbol is uppercase", () => {
      const testState = {};
      const testPayload = {
        symbol: "Dks",
        name: "Dick's Sporting Goods, Inc.",
      };
      const expectedMatch = {
        securities: {
          DKS: dicks,
        },
      };

      const actionCreator = securityAdded;

      const testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toMatchObject(expectedMatch);
    });

    it("should handle nth securityAdded, and not create duplicate symbols", () => {
      const testState = {
        securities: {
          [amazon.symbol]: amazon,
          [dicks.symbol]: dicks,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const testPayload = {
        symbol: "Dks",
        name: "Dick's Sporting Goods, Inc.",
      };
      const expectedMatch = {
        securities: {
          DKS: dicks,
          AMZ: amazon,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };

      const actionCreator = securityAdded;

      const testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });

    it("should handle securityUpdated (with lower case symbols)", () => {
      const testState = {
        securities: {
          [amazon.symbol]: amazon,
          [dicks.symbol]: dicks,
          [spg.symbol]: spg,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const testPayload = {
        symbol: "spg",
        name: "Simon Property Group",
      };
      const expectedMatch = {
        securities: {
          DKS: dicks,
          AMZ: amazon,
          SPG: {
            symbol: "SPG",
            name: "Simon Property Group",
          },
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const actionCreator = securityUpdated;

      const testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });

    it("should handle securitySymbolChanged", () => {
      const testState = {
        securities: {
          DKS: dicks,
          ABCD: {
            symbol: "ABCD",
            name: "Alphabet, Inc.",
          },
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const testPayload = {
        currentSymbol: "ABCD",
        newSymbol: "ABC",
      };
      const expectedMatch = {
        securities: {
          ABC: {
            symbol: "ABC",
            name: "Alphabet, Inc.",
          },
          DKS: dicks,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const actionCreator = securitySymbolChanged;

      const testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });

    it("should handle securityRemoved", () => {
      const testState = {
        securities: {
          DKS: dicks,
          AMZ: amazon,
          ABC: {
            symbol: "ABC",
            name: "Alphabet, Inc.",
          },
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const testPayload = "abc";
      const expectedMatch = {
        securities: {
          AMZ: amazon,
          DKS: dicks,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const actionCreator = securityRemoved;

      const testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });

    it("should handle securityRemoved even if symbol not found", () => {
      const testState = {
        securities: {
          DKS: dicks,
          AMZ: amazon,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const testPayload = "ABC";
      const expectedMatch = testState;
      const actionCreator = securityRemoved;

      const testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });
  });

  describe("extraReducers: fetchFMPTradableSymbolsList", () => {
    it("should handle a pending request", () => {
      const testState = {
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const testRequestPackage: FMPRequestObject = {
        requestType: "tradableSymbolsList",
      };
      const testAction = fetchFMPTradableSymbolsList.pending(
        "myId",
        testRequestPackage
      );

      const actual = functions.securitiesSlice.reducer(
        testState as any,
        testAction
      );

      expect(actual).toStrictEqual({
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "pending",
        currentRequestId: "myId",
        error: undefined,
      });
    });

    it("should handle fulfilled promise response ", () => {
      const testState = {
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "pending",
        currentRequestId: "myId",
        error: undefined,
      };
      const testRequestPackage: FMPRequestObject = {
        requestType: "tradableSymbolsList",
      };

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
        {
          symbol: "KMI",
          name: "Kinder Morgan Inc",
          price: 17.51,
          exchange: "New York Stock Exchange",
        },
        {
          symbol: "INTC",
          name: "Intel Corp",
          price: 56.85,
          exchange: "Nasdaq Global Select",
        },
      ];

      const testAction = fetchFMPTradableSymbolsList.fulfilled(
        tradableListFixture,
        "",
        testRequestPackage
      );
      // console.log(action)

      const actual = functions.securitiesSlice.reducer(
        testState as any,
        testAction
      );
      // console.log("Test Result", actual)

      expect(actual).toStrictEqual({
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: tradableListFixture, // securities fixture,
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      });
    });

    it("should handle a rejection response", () => {
      const testState = {
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "pending",
        currentRequestId: "myId",
        error: undefined,
      };
      const testRequestPackage: FMPRequestObject = {
        requestType: "tradableSymbolsList",
      };

      const testAction = fetchFMPTradableSymbolsList.rejected(
        new Error("Test Error"),
        "",
        testRequestPackage
      );

      const actual = functions.securitiesSlice.reducer(
        testState as any,
        testAction
      );

      expect(actual).toStrictEqual({
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [], // securities fixture,
        loading: "idle",
        currentRequestId: undefined,
        error: "Test Error",
      });
    });
  });

  describe("extraReducers: fetchFMPCompaniesSymbolsList", () => {
    it("should handle a pending request", () => {
      const testState = {
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      const testRequestPackage: FMPRequestObject = {
        requestType: "companiesSymbolsList",
      };
      const testAction = functions.fetchFMPCompaniesSymbolsList.pending(
        "myId",
        testRequestPackage
      );

      const actual = functions.securitiesSlice.reducer(
        testState as any,
        testAction
      );

      expect(actual).toStrictEqual({
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "pending",
        currentRequestId: "myId",
        error: undefined,
      });
    });

    it("should handle fulfilled promise response ", () => {
      const testState = {
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "pending",
        currentRequestId: "myId",
        error: undefined,
      };
      const testRequestPackage: FMPRequestObject = {
        requestType: "companiesSymbolsList",
      };

      const companiesListFixture = [
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
        {
          symbol: "KMI",
          name: "Kinder Morgan Inc",
          price: 17.51,
          exchange: "New York Stock Exchange",
        },
        {
          symbol: "INTC",
          name: "Intel Corp",
          price: 56.85,
          exchange: "Nasdaq Global Select",
        },
      ];

      const testAction = functions.fetchFMPCompaniesSymbolsList.fulfilled(
        companiesListFixture,
        "",
        testRequestPackage
      );
      // console.log(action)

      const actual = functions.securitiesSlice.reducer(
        testState as any,
        testAction
      );
      // console.log("Test Result", actual)

      expect(actual).toStrictEqual({
        securities: {},
        fmpCompaniesSymbolsList: companiesListFixture,
        fmpTradableSymbolsList: [], // securities fixture,
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      });
    });

    it("should handle a rejection response", () => {
      const testState = {
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [],
        loading: "pending",
        currentRequestId: "myId",
        error: undefined,
      };
      const testRequestPackage: FMPRequestObject = {
        requestType: "companiesSymbolsList",
      };

      const testAction = functions.fetchFMPCompaniesSymbolsList.rejected(
        new Error("Test Error"),
        "",
        testRequestPackage
      );

      const actual = functions.securitiesSlice.reducer(
        testState as any,
        testAction
      );

      expect(actual).toStrictEqual({
        securities: {},
        fmpCompaniesSymbolsList: [],
        fmpTradableSymbolsList: [], // securities fixture,
        loading: "idle",
        currentRequestId: undefined,
        error: "Test Error",
      });
    });
  });
});
