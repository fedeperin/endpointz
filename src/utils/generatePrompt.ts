import type { CustomSchema } from '$utils/types.d'

export default (schema: CustomSchema, textPrompt: string): string => {
  let promptFromSchema: string = ''

  for (const key in schema) {
    promptFromSchema += `The key "${key}" is ${schema[key].prompt.toLowerCase()}. `
  }

  return `${promptFromSchema} ${textPrompt}`
}
