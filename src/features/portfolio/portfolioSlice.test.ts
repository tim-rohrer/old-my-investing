import { cleanup } from "../../test-utils";
import portfolio, {
  portfolioIsLoaded,
  holdingIsAdded,
  holdingIsRemoved,
} from "./portfolioSlice";

afterEach(cleanup);

let amazon = {
  symbol: "AMZ",
  name: "Amazon, Inc.",
};

let dicks = {
  symbol: "DKS",
  name: "Dick's Sporting Goods, Inc.",
};

let lippert = {
  symbol: "LCII",
  name: "Lippert Components, Inc.",
};
let state0 = {};

let state1 = {
  [amazon.symbol]: {
    ...amazon,
  },
};

let state2 = {
  [amazon.symbol]: {
    ...amazon,
  },
  [dicks.symbol]: {
    ...dicks,
  },
};

let state3 = {
  ...state2,
  [lippert.symbol]: {
    ...lippert,
  },
};

let state4 = {
  [amazon.symbol]: {
    ...amazon,
  },
  [lippert.symbol]: {
    ...lippert,
  },
};

describe("Portfolio reducer", () => {
  it("should return the initial state", () => {
    expect(portfolio(undefined, { type: "@@INIT" } as any)).toEqual({
      isLoaded: false,
      holdings: {},
    });
  });
  it("should handle portfolioIsLoaded", () => {
    expect(
      portfolio({} as any, {
        type: portfolioIsLoaded,
        payload: true,
      })
    ).toEqual({ isLoaded: true });
  });

  it("should handle adding a holding (holdingIsAdded) even with lower case symbols", () => {
    expect(
      portfolio(state0 as any, {
        type: holdingIsAdded,
        payload: {
          symbol: "AMZ",
          name: "Amazon, Inc.",
        },
      })
    ).toMatchObject(state1);

    expect(
      portfolio(state1 as any, {
        type: holdingIsAdded,
        payload: {
          symbol: "DKS",
          name: "Dick's Sporting Goods, Inc.",
        },
      })
    ).toMatchObject(state2);

    expect(
      portfolio(state2 as any, {
        type: holdingIsAdded,
        payload: {
          symbol: "lcii",
          name: "Lippert Components, Inc.",
        },
      })
    ).toMatchObject(state3);
  });
  it("should handle removing a holding (holdingIsRemoved) from the portfolio", () => {
    expect(
      portfolio(state3 as any, {
        type: holdingIsRemoved,
        payload: "dks",
      })
    ).toMatchObject(state4);
  });
});
