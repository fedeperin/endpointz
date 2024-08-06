import Endpoint from '$db/models/Endpoint'
import User from '$db/models/User'
import serverResponse from '$utils/serverResponse'
import bcrypt from 'bcrypt'

const pickRandomItem = (arr: object[]): object => arr[Math.floor(Math.random() * arr.length)]

export const GET = async ({ params, url }) => {
  const { user, endpoint } = params

  try {
    const userData = await User.findOne({ username: user })
    if(userData === null) throw Error('User does not exist')

    let endpointData = await Endpoint.findOne({ owner_id: userData?.user_id, name: endpoint })
    if(endpointData === null) throw Error('Endpoint does not exist')

    endpointData = JSON.parse(JSON.stringify(endpointData))

    if(endpointData.private === true) {
      const apiKey = url.searchParams.get('api_key')
      if(apiKey === null) return serverResponse({
        message: `This endpoint is private, api_key param is missing`
      }, 401)

      const validKey = await Promise.all(endpointData.api_key.map(async (key: { name: string, key: string }) => {
        const isValid = await bcrypt.compare(apiKey, key.key)
        return isValid ? key : null
      })).then(results => results.find(key => key !== null))

      if(!validKey) return serverResponse({
        message: `Invalid API key`
      }, 401)
    }

    return serverResponse(pickRandomItem(endpointData.array))
  }catch {
    return serverResponse({
      message: `Endpoint ${ params.user }/${ params.endpoint } does not exist`
    }, 404)
  }
}