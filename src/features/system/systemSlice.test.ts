import { cleanup } from "../../common/test-utils"
import system, { appIsLoaded, appIsThinking } from "./systemSlice"

afterEach(cleanup)

describe("System Slice", () => {
  it("should return the initial state", () => {
    const testInitialState = {
      userId: "Demo", // Needs to be implemented in actions.
      appThinking: false,
      appLoaded: false,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(
      system(undefined, { type: "@@INIT" } as any),
    ).toStrictEqual(testInitialState)
  })

  it("should set appLoaded to true", () => {
    const testArg = true
    const testPayload = testArg
    let testState: undefined
    const expectedMatch: Record<string, unknown> = {
      userId: "Demo",
      appThinking: false,
      appLoaded: testArg,
    }
    const actionCreator = appIsLoaded

    const testResult = system(testState, actionCreator(testPayload))

    expect(testResult).toStrictEqual(expectedMatch)
  })
  it("should set appLoaded to false", () => {
    const testArg = false
    const testPayload = testArg
    let testState: undefined
    const expectedMatch: Record<string, unknown> = {
      userId: "Demo",
      appThinking: false,
      appLoaded: testArg,
    }
    const actionCreator = appIsLoaded

    const testResult = system(testState, actionCreator(testPayload))

    expect(testResult).toStrictEqual(expectedMatch)
  })

  it("should set appThinking to true", () => {
    const testArg = true
    const testPayload = testArg
    const testState = {
      userId: "Demo",
      appThinking: false,
      appLoaded: true,
    }
    const expectedMatch: Record<string, unknown> = {
      userId: "Demo",
      appThinking: testArg,
      appLoaded: true,
    }
    const actionCreator = appIsThinking

    const testResult = system(testState, actionCreator(testPayload))

    expect(testResult).toStrictEqual(expectedMatch)
  })

  it("should set appThinking to false", () => {
    const testArg = false
    const testPayload = testArg
    const testState = {
      userId: "Demo",
      appThinking: true,
      appLoaded: true,
    }
    const expectedMatch: Record<string, unknown> = {
      userId: "Demo",
      appThinking: testArg,
      appLoaded: true,
    }
    const actionCreator = appIsThinking

    const testResult = system(testState, actionCreator(testPayload))

    expect(testResult).toStrictEqual(expectedMatch)
  })
})
