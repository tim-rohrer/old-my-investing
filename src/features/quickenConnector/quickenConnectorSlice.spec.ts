import { cleanup } from "../../test-utils"
import quickenConnector, { fetchQuickenData, quickenConnectorState } from "./quickenConnectorSlice"
import quickenExtractorTestData from "./quickendData.fixture"

afterEach(cleanup)

test("Reducer should return the initial state", () => {
  expect(
    quickenConnector(undefined, { type: "@@INIT" } as any),
  ).toEqual({
    loading: "idle",
    currentRequestId: undefined,
    error: null,
    data: {},
  })
})

//   it("should handle quickenConnectorIsLoaded", () => {
//     expect(
//       quickenConnector({} as any, {
//         type: quickenDataIsLoaded,
//         payload: true,
//       })
//     ).toEqual({ : true });
//   })
describe("ExtraReducers/Quicken Data/fetchQuickenData", () => {
  it("should handle a pending request", () => {
    const testState: quickenConnectorState = {
      loading: "idle",
      currentRequestId: undefined,
      error: null,
      data: {},
    }
    const testAction = fetchQuickenData.pending("myId")

    const actual = quickenConnector(testState as any, testAction)

    expect(actual).toStrictEqual({
      loading: "pending",
      currentRequestId: "myId",
      error: null,
      data: {},
    })
  })
  it("should handle a fulfilled request", () => {
    const testState: quickenConnectorState = {
      loading: "pending",
      currentRequestId: "myId",
      error: null,
      data: {},
    }
    const testAction = fetchQuickenData.fulfilled(
      quickenExtractorTestData,
      "myId",
    )

    const actual = quickenConnector(testState as any, testAction)

    expect(actual.loading).toStrictEqual("idle")
    expect(actual.data).toHaveProperty("ZACCOUNT")
  })
  it("should handle a rejected request", () => {
    const testState: quickenConnectorState = {
      loading: "pending",
      currentRequestId: "myId",
      error: null,
      data: {},
    }

    const testAction = fetchQuickenData.rejected(new Error(), "myId")

    const actual = quickenConnector(testState as any, testAction)

    expect(actual.loading).toStrictEqual("idle")
    expect(actual.data).toMatchObject({})
    expect(actual.error).not.toBeNull()
  })
})
