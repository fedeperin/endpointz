import Endpoint from '$db/models/Endpoint'
import User from '$db/models/User'

export const load = async ({ params }) => {
  const { user, endpoint } = params

  try {
    const userData = await User.findOne({ username: user })
    if(userData === null) throw Error('User does not exist')
    
    let endpointData = await Endpoint.findOne({ owner_id: userData?.user_id, name: endpoint })
    if(endpointData === null) throw Error('Endpoint does not exist')

    endpointData = JSON.parse(JSON.stringify(endpointData))

    delete endpointData.api_key
    delete endpointData.__v

    return {
      success: true,
      ...JSON.parse(JSON.stringify(endpointData)),
      user: userData.username
    }
  } catch {
    return {
      success: false
    }
  }
}