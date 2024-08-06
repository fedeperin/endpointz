export default (arr: unknown[]): boolean => {
  if (arr.length === 0) return true

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getType = (obj: any) => Object.keys(obj).map(key => typeof obj[key])
  const types = getType(arr[0])

  return arr.every(obj => {
    const objTypes = getType(obj)
    return types.length === objTypes.length && types.every((type, index) => type === objTypes[index])
  })
} 