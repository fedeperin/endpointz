import jwt from 'jsonwebtoken'

const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET ?? 'SECRET'

export const createJWT = (data: object): string => jwt.sign(data, JWT_ACCESS_SECRET, { expiresIn: '30d' })
export const verifyJWT = (token: string): unknown => jwt.verify(token, JWT_ACCESS_SECRET)
