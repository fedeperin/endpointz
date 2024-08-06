import { redirect, type Cookies } from '@sveltejs/kit'

export const logOut = (cookies: Cookies) => {
  cookies.set('AuthorizationToken', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0
  })

  throw redirect(302, '/')
}
