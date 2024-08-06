import { ZodSchema, z } from 'zod'

import type { CustomSchema } from '$utils/types.d'


export const customSchemaToZod = (schema: CustomSchema): ZodSchema => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const zodSchema: { [key: string]: any } = {}

  for (const key in schema) {
    switch (schema[key].type) {
      case 'string':
        zodSchema[key] = z.string()
        break
      case 'number':
        zodSchema[key] = z.number()
        break
      case 'boolean':
        zodSchema[key] = z.boolean()
        break
      case 'date':
        zodSchema[key] = z.string().date()
        break
      default:
        throw new Error(`Unknown type: ${schema[key].type}`)
    }
  }

  return z.object(zodSchema)
}
