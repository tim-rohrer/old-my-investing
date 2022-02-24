import { extractParentheticalText } from "./helperFunctions"

describe("Helper Functions", () => {
  describe("extractParentheticalText", () => {
    it("returns the text from between the first set of parenthesis", () => {
      const testString = "Apple Computer, Inc. (AAPL) (XYZ)"

      const result = extractParentheticalText(testString)
      expect(result).toEqual("AAPL")
      expect(result).not.toEqual("XYZ")
    })
    it("returns null for case with no parenthetical text", () => {
      const testString = "Apple Computer, Inc."

      expect(extractParentheticalText(testString)).toEqual(null)
    })
  })
})
