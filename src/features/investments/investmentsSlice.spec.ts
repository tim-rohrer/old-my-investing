import { cleanup } from "../../test-utils"
import quickenConnector, { fetchQuickenData, QuickenConnectorState } from "./investmentsSlice"
import fixture from "./quickenParsedData.fixture"

afterEach(cleanup)

test("Reducer should return the initial state", () => {
  expect(
    quickenConnector(undefined, { type: "@@INIT" } as any),
  ).toEqual({
    loading: "idle",
    currentRequestId: undefined,
    error: null,
    ids: [],
    entities: {},
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
    const testState: QuickenConnectorState = {
      loading: "idle",
      currentRequestId: undefined,
      error: null,
      ids: [],
      entities: {},
    }
    const testAction = fetchQuickenData.pending("myId")

    const actual = quickenConnector(testState as any, testAction)

    expect(actual).toStrictEqual({
      loading: "pending",
      currentRequestId: "myId",
      error: null,
      ids: [],
      entities: {},
    })
  })
  it("should handle a fulfilled request", () => {
    const testState: QuickenConnectorState = {
      loading: "pending",
      currentRequestId: "myId",
      error: null,
      ids: [],
      entities: {},
    }
    const testAction = fetchQuickenData.fulfilled(
      fixture.data,
      "myId",
    )

    const actual = quickenConnector(testState as any, testAction)

    expect(actual.loading).toStrictEqual("idle")
  })
  it("should handle a rejected request", () => {
    const testState: QuickenConnectorState = {
      loading: "pending",
      currentRequestId: "myId",
      error: null,
      ids: [],
      entities: {},
    }

    const testAction = fetchQuickenData.rejected(new Error(), "myId")

    const actual = quickenConnector(testState as any, testAction)

    expect(actual.loading).toStrictEqual("idle")
    expect(actual.entities).toMatchObject({})
    expect(actual.error).not.toBeNull()
  })
})
