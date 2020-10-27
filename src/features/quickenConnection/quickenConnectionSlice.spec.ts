import { cleanup } from "../../test-utils";
import quickenConnection, {
  fetchQuickenData,
  QuickenConnectionState,
} from "./quickenConnectionSlice";
import quickenExtractorTestData from "./quickendData.fixture";

afterEach(cleanup);

describe("Quicken Connection", () => {
  describe("Reducer", () => {
    it("should return the initial state", () => {
      expect(quickenConnection(undefined, { type: "@@INIT" } as any)).toEqual({
        loading: "idle",
        currentRequestId: undefined,
        error: null,
        data: {},
      });
    });
  });

  //   it("should handle quickenConnectionIsLoaded", () => {
  //     expect(
  //       quickenConnection({} as any, {
  //         type: quickenDataIsLoaded,
  //         payload: true,
  //       })
  //     ).toEqual({ : true });
  //   })
  describe("ExtraReducers/Quicken Data/fetchQuickenData", () => {
    it("should handle a pending request", () => {
      const testState: QuickenConnectionState = {
        loading: "idle",
        currentRequestId: undefined,
        error: null,
        data: {},
      };
      const testAction = fetchQuickenData.pending("myId", "");

      const actual = quickenConnection(testState as any, testAction);

      expect(actual).toStrictEqual({
        loading: "pending",
        currentRequestId: "myId",
        error: null,
        data: {},
      });
    });
    it("should handle a fullfilled request", () => {
      const testState: QuickenConnectionState = {
        loading: "pending",
        currentRequestId: "myId",
        error: null,
        data: {},
      };
      const testAction = fetchQuickenData.fulfilled(
        quickenExtractorTestData,
        "myId",
        ""
      );

      const actual = quickenConnection(testState as any, testAction);

      expect(actual.loading).toStrictEqual("idle");
      expect(actual.data).toHaveProperty("ZACCOUNT");
    });
    it("should handle a rejected request", () => {
      const testState: QuickenConnectionState = {
        loading: "pending",
        currentRequestId: "myId",
        error: null,
        data: {},
      };

      const testAction = fetchQuickenData.rejected(new Error(), "myId", "");

      const actual = quickenConnection(testState as any, testAction);

      expect(actual.loading).toStrictEqual("idle");
      expect(actual.data).toMatchObject({});
      expect(actual.error).not.toBeNull();
    });
  });
});
