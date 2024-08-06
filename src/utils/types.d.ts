export interface IProperty {
  id: number
  name: string
  type: 'string' | 'number' | 'boolean' | 'date'
  prompt: string
}

export interface CustomSchema {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'date'
    prompt: string
  }
}
