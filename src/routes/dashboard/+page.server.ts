import { redirect } from '@sveltejs/kit'
import  { verifyJWT } from '$utils/jwt'
import { logOut } from '$utils/session'
import Endpoint from '$db/models/Endpoint'

export const load = async ({ cookies }) => {
  const token = cookies?.get('AuthoizationToken')?.substring(7)
  if(!token) throw redirect(302, '/')

  let userData

  try {
    userData = JSON.parse(JSON.stringify(verifyJWT(token)))
  }catch {
    logOut(cookies)
  }

  try {
    const endpointz = await Endpoint.find({
      owner_id: userData?.user_id
    })
    
    return JSON.parse(JSON.stringify({
      endpointz,
      user: userData
    }))
  }catch {
    return {
      success: false,
      status: 404,
      message: 'Endpoint does not exist'
    }
  }
}