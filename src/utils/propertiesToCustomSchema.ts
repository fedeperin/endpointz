import type { CustomSchema, IProperty } from './types'

export default (propertiesString: FormDataEntryValue | null): CustomSchema => {
  if(typeof propertiesString !== 'string') throw Error('Error parsing properties')

  const properties: IProperty[] = JSON.parse(propertiesString)
  const newObject: CustomSchema = {}

  properties.forEach(prop => {
    newObject[prop.name] = {
      type: prop.type,
      prompt: prop.prompt
    }
  })

  return newObject
}