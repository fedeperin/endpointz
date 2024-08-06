import Endpoint from '$db/models/Endpoint'
import { verifyJWT } from '$utils/jwt'
import { logOut } from '$utils/session'
import { redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'

export const load = async ({ cookies, params }) => {
  const token = cookies?.get('AuthoizationToken')?.substring(7)
  if(!token) throw redirect(302, '/')

  let data

  try {
    data = JSON.parse(JSON.stringify(verifyJWT(token)))
  }catch {
    logOut(cookies)
  }
  
  try {
    const endpointFound = await Endpoint.findOne({
      name: params.endpoint,
      owner_id: data?.user_id
    })

    if(endpointFound === null) throw Error()
    
    return JSON.parse(JSON.stringify(endpointFound))
  }catch {
    return {
      success: false,
      status: 404,
      message: 'Endpoint does not exist'
    }
  }
}

export const actions = {
  edit: async ({ request, cookies, params }) => {
    const formData = await request.formData()
    const displayName = formData.get('display-name')
    const description = formData.get('description')
    const privateAPI = formData.get('private') === 'on'
    const array = formData.get('array')
    const plainApiKeys = formData.get('api-keys')
    
    try {
      const arrayParsed = JSON.parse((typeof array === 'string' && array !== '') ? array : '[]')
      const apiKeysParsed: {
        isNew: boolean,
        name: string,
        key: string
      }[] = JSON.parse((typeof plainApiKeys === 'string' && array !== '') ? plainApiKeys : '[]')
      const apiKeys = await Promise.all(apiKeysParsed.map(async key => {
        if(!key.isNew) return {
          name: key.name,
          key: key.key
        }

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

      const endpoint = await Endpoint.findOneAndUpdate({ owner_id: user_id, name: params.endpoint }, {
        display_name: displayName,
        description,
        array: arrayParsed,
        private: privateAPI,
        api_key: apiKeys
      })

      await endpoint.save()

      return {
        success: true
      }
    } catch(e) {
      console.log(e)
      return {
        success: false
      }
    }
  }
}
