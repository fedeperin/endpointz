import type { CustomSchema } from "./types"

export const toastConfig = {
  style: 'background: #333; color: #fff;'
}

export const examplePrompts: {
  prompt: string,
  properties: CustomSchema
}[] = [
  {
    prompt: 'Ideas for Full Stack projects',
    properties: {
      title: {
        type: 'string',
        prompt: 'The title of the idea'
      },
      description: {
        type: 'string',
        prompt: 'A detailed description of the idea'
      },
      difficulty: {
        type: 'number',
        prompt: 'The difficulty of the project from 1 to 10'
      },
    }
  }
]