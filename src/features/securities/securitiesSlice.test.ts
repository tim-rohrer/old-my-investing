import { cleanup } from "../../test-utils";
import securities, {
  securityAdded,
  securityUpdated,
  securitySymbolChanged,
  securityRemoved,
} from "./securitiesSlice";

afterEach(cleanup);

describe("Securities", () => {
  let amazon = {
    securitySymbol: "AMZ",
    name: "Amazon, Inc.",
  };

  let dicks = {
    securitySymbol: "DKS",
    name: "Dick's Sporting Goods, Inc.",
  };

  let spg = {
    securitySymbol: "SPG",
    name: "Simons Property Group",
  };
  describe("Reducer", () => {
    it("should return the initial state", () => {
      expect(securities(undefined, { type: "@@INIT" } as any)).toEqual({
        "": {
          securitySymbol: "",
          name: "",
        },
      });
    });
    it("should handle securityAdded", () => {
      let testState = {};
      let testPayload = {
        securitySymbol: "DKS",
        name: "Dick's Sporting Goods, Inc.",
      };
      let expectedMatch = {
        DKS: dicks,
      };

      let actionCreator = securityAdded;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toMatchObject(expectedMatch);
    });
    it("should handle securityAdded and making sure the the securitySymbol is uppercase", () => {
      let testState = {};
      let testPayload = {
        securitySymbol: "Dks",
        name: "Dick's Sporting Goods, Inc.",
      };
      let expectedMatch = {
        DKS: dicks,
      };

      let actionCreator = securityAdded;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toMatchObject(expectedMatch);
    });
    it("should handle nth securityAdded, and not create duplicate symbols", () => {
      let testState = {
        [amazon.securitySymbol]: amazon,
        [dicks.securitySymbol]: dicks,
      };
      let testPayload = {
        securitySymbol: "Dks",
        name: "Dick's Sporting Goods, Inc.",
      };
      let expectedMatch = {
        DKS: dicks,
        AMZ: amazon,
      };

      let actionCreator = securityAdded;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });
    it("should handle securityUpdated (with lower case symbols)", () => {
      let testState = {
        [amazon.securitySymbol]: amazon,
        [dicks.securitySymbol]: dicks,
        [spg.securitySymbol]: spg,
      };
      let testPayload = {
        securitySymbol: "spg",
        name: "Simon Property Group",
      };
      let expectedMatch = {
        DKS: dicks,
        AMZ: amazon,
        SPG: {
          securitySymbol: "SPG",
          name: "Simon Property Group",
        },
      };
      let actionCreator = securityUpdated;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });
    it("should handle securitySymbolChanged", () => {
      let testState = {
        DKS: dicks,
        ABCD: {
          securitySymbol: "ABCD",
          name: "Alphabet, Inc.",
        },
      };
      let testPayload = {
        currentSymbol: "ABCD",
        newSymbol: "ABC",
      };
      let expectedMatch = {
        ABC: {
          securitySymbol: "ABC",
          name: "Alphabet, Inc.",
        },
        DKS: dicks,
      };
      let actionCreator = securitySymbolChanged;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });
    it("should handle securityRemoved", () => {
      let testState = {
        DKS: dicks,
        AMZ: amazon,
        ABC: {
          securitySymbol: "ABC",
          name: "Alphabet, Inc.",
        },
      };
      let testPayload = "abc";
      let expectedMatch = {
        AMZ: amazon,
        DKS: dicks,
      };
      let actionCreator = securityRemoved;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });
    it("should handle securityRemoved even if securitySymbol not found", () => {
      let testState = {
        DKS: dicks,
        AMZ: amazon,
      };
      let testPayload = "ABC";
      let expectedMatch = testState;
      let actionCreator = securityRemoved;

      let testResult = securities(testState as any, actionCreator(testPayload));

      expect(testResult).toStrictEqual(expectedMatch);
    });
  });
});
