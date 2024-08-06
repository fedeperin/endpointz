import { CLIENT_SECRET } from '$env/static/private'
import { PUBLIC_CLIENT_ID } from '$env/static/public'
import { redirect } from '@sveltejs/kit'
import User from '$db/models/User'
import { createJWT } from '$utils/jwt'

export const GET = async ({ url, cookies }) => {
  const code = url.searchParams.get('code')

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        client_id: PUBLIC_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code
      })
    })

    if(tokenRes.status !== 201 && tokenRes.status !== 200) {
      throw Error('Error generating Github token')
    }
    
    const tokenData = await tokenRes.json()
    
    
    const { access_token: token }: { access_token: string } = tokenData

    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if(userRes.status !== 201 && userRes.status !== 200) {
      throw Error('Error validating the user with Github')
    }

    const userData = await userRes.json()

    const userForDB = {
      username: userData.login,
      name: userData.name,
      image: userData.avatar_url,
      user_id: userData.node_id
    }

    const DBUserData = await User.findOne({ user_id: userForDB.user_id })

    if(DBUserData === null) {
      const newUser = new User(userForDB)

      await newUser.save()
    }

    cookies.set('AuthoizationToken', `Bearer ${ createJWT(userForDB) }`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/' 
    })
  } catch(e) {
    console.log(e)
    throw redirect(302, '/user-error')
  }

  throw redirect(302, '/dashboard')
}