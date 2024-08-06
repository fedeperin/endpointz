import { redirect } from '@sveltejs/kit'
import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import  { verifyJWT } from '$utils/jwt'
import { logOut } from '$utils/session'
import propertiesToCustomSchema from '$utils/propertiesToCustomSchema'
import type { CustomSchema } from '$utils/types.d'
import { customSchemaToZod } from '$utils/zod'
import { GROQ_API_KEY } from '$env/static/private'
import generatePrompt from '$utils/generatePrompt'
import Endpoint from '$db/models/Endpoint'
import bcrypt from 'bcrypt'

export const load = async ({ cookies }) => {
  const token = cookies?.get('AuthoizationToken')?.substring(7)
  if(!token) throw redirect(302, '/')

  try {
    const data = verifyJWT(token)

    return JSON.parse(JSON.stringify(data))
  }catch {
    logOut(cookies)
  }
}

export const actions = {
  generate: async ({ request }) => {
    const formData = await request.formData()
    const prompt = formData.get('prompt')
    const limit = formData.get('limit')
  
    try {
      const customSchema: CustomSchema = propertiesToCustomSchema(formData.get('properties'))
      const zodObject = customSchemaToZod(customSchema)
      const groq = createOpenAI({
        baseURL: 'https://api.groq.com/openai/v1',
        apiKey: GROQ_API_KEY // TODO: Add own API key
      })
      const generation = await generateObject({
        model: groq('llama3-groq-70b-8192-tool-use-preview'),
        schema: z.object({ response: zodObject.array().length(limit ? +limit : 10) }),
        prompt: generatePrompt(customSchema, (typeof prompt === 'string') ? prompt : ''),
        system: 'You are an array of JSON generator. The prompt will be a plain text JSON with the keys of each JSON in the final array, the value of each key is the prompt for that specific key. In the prompt, following the JSON there will be a text explaining in general the result.' // TODO: Improve system
      })

      return JSON.parse(JSON.stringify({
        success: true,
        generation
      }))
    } catch {
      return {
        success: false
      }
    }
  },
  publish: async ({ request, cookies }) => {
    const formData = await request.formData()
    const displayName = formData.get('display-name')
    const name = formData.get('name')
    const description = formData.get('description')
    const privateAPI = formData.get('private') === 'on'
    const array = formData.get('array')
    const plainApiKeys = formData.get('api-keys')
    
    try {
      const arrayParsed = JSON.parse((typeof array === 'string') ? array : '')

      const apiKeysParsed: {
        isNew: boolean,
        name: string,
        key: string
      }[] = JSON.parse((typeof plainApiKeys === 'string' && array !== '') ? plainApiKeys : '[]')
      const apiKeys = await Promise.all(apiKeysParsed.map(async key => {
        const hashedKey = await bcrypt.hash(key.key, 10)

        return {
          key: hashedKey,
          name: key.name
        }
      }))

      const token = cookies?.get('AuthoizationToken')?.substring(7)
      if(!token) throw Error('Missing Session')

      const { user_id } = JSON.parse(JSON.stringify(verifyJWT(token)))

      if(!user_id) throw Error('Missing User')

      const endpoint = new Endpoint({
        display_name: displayName,
        name,
        description,
        array: arrayParsed,
        private: privateAPI,
        owner_id: user_id,
        api_key: apiKeys
      })

      await endpoint.save()
    } catch(e) {
      console.log(e)
      return {
        success: false
      }
    }
    
    throw redirect(304, `../dashboard/${ name }`)
  }
}