export const extractParentheticalText = (originalString: string) => {
  const regExp = /\(([^)]+)\)/g
  const matches = originalString.match(regExp)
  if (matches !== null) {
    return matches[0].substring(1, matches[0].length - 1)
  }
  return null
}
