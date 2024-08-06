import Endpoint from '$db/models/Endpoint'
import User from '$db/models/User'
import { json } from '@sveltejs/kit'

export const GET = async ({ params }) => {
  try {
    const user = await User.findOne({
      username: params.user
    })

    const endpointz = await Endpoint.find({
      owner_id: user.user_id,
      private: false
    })

    const publicEndpointz = endpointz.map(endpoint => {
      return endpoint.name
    })

    return json({
      username: params.user,
      name: user.name,
      public_endpointz_count: (endpointz === null) ? 0 : endpointz.length,
      public_endpointz: publicEndpointz
    })
  }catch {
    return json({
      message: `User ${ params.user } does not exist`,
      status: 404
    })
  }
}