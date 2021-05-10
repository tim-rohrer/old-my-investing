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
  let amazon = {
    symbol: "AMZ",
    name: "Amazon, Inc.",
  };

  let dicks = {
    symbol: "DKS",
    name: "Dick's Sporting Goods, Inc.",
  };

  let spg = {
    symbol: "SPG",
    name: "Simons Property Group",
  };
  describe("Reducer", () => {
    it("should return the initial state", () => {
      expect(securities(undefined, { type: "@@INIT" } as any)).toEqual({
        securities: {},
        fmpTradableSymbolsList: [],
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      });
    });

    it("should handle securityAdded", () => {
      let testState = {};
      let testPayload = {
        symbol: "DKS",
        name: "Dick's Sporting Goods, Inc.",
      };
      let expectedMatch = {
        securities: {
          DKS: dicks,
        },
      };

      let actionCreator = securityAdded;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toMatchObject(expectedMatch);
    });

    it("should handle securityAdded and making sure the the symbol is uppercase", () => {
      let testState = {};
      let testPayload = {
        symbol: "Dks",
        name: "Dick's Sporting Goods, Inc.",
      };
      let expectedMatch = {
        securities: {
          DKS: dicks,
        },
      };

      let actionCreator = securityAdded;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toMatchObject(expectedMatch);
    });

    it("should handle nth securityAdded, and not create duplicate symbols", () => {
      let testState = {
        securities: {
          [amazon.symbol]: amazon,
          [dicks.symbol]: dicks,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      let testPayload = {
        symbol: "Dks",
        name: "Dick's Sporting Goods, Inc.",
      };
      let expectedMatch = {
        securities: {
          DKS: dicks,
          AMZ: amazon,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };

      let actionCreator = securityAdded;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });

    it("should handle securityUpdated (with lower case symbols)", () => {
      let testState = {
        securities: {
          [amazon.symbol]: amazon,
          [dicks.symbol]: dicks,
          [spg.symbol]: spg,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      let testPayload = {
        symbol: "spg",
        name: "Simon Property Group",
      };
      let expectedMatch = {
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
      let actionCreator = securityUpdated;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });

    it("should handle securitySymbolChanged", () => {
      let testState = {
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
      let testPayload = {
        currentSymbol: "ABCD",
        newSymbol: "ABC",
      };
      let expectedMatch = {
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
      let actionCreator = securitySymbolChanged;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });

    it("should handle securityRemoved", () => {
      let testState = {
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
      let testPayload = "abc";
      let expectedMatch = {
        securities: {
          AMZ: amazon,
          DKS: dicks,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      let actionCreator = securityRemoved;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });

    it("should handle securityRemoved even if symbol not found", () => {
      let testState = {
        securities: {
          DKS: dicks,
          AMZ: amazon,
        },
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      };
      let testPayload = "ABC";
      let expectedMatch = testState;
      let actionCreator = securityRemoved;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });
  });

  describe("extraReducers: fetchFMPTradableSymbolsList", () => {
    it("should handle a pending request", () => {
      const testState = {
        securities: {},
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
        fmpTradableSymbolsList: [],
        loading: "pending",
        currentRequestId: "myId",
        error: undefined,
      });
    });

    it("should handle fulfilled promise response ", () => {
      const testState = {
        securities: {},
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
        fmpTradableSymbolsList: tradableListFixture, // securities fixture,
        loading: "idle",
        currentRequestId: undefined,
        error: undefined,
      });
    });

    it("should handle a rejection response", () => {
      const testState = {
        securities: {},
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
        fmpTradableSymbolsList: [], // securities fixture,
        loading: "idle",
        currentRequestId: undefined,
        error: "Test Error",
      });
    });
  });
});
