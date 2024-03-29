import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {AUTH_HEADER, JWT_SECRET} from '../../constants'
import {CustomError} from '../errors'
import {AuthError} from '../../enums/errors/auth.error'
import {StatusCodes} from 'http-status-codes'

function verifyJwt(token: string) {
  try {
    const payload: any = jwt.verify(token, JWT_SECRET)
    return payload.id
  } catch (error) {
    return false
  }
}

export function generateJwtToken(payload: any) {
  const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'})
  return token
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header(AUTH_HEADER)
  if (!token) {
    throw new CustomError(AuthError.NOT_AUTHENTICATED, StatusCodes.UNAUTHORIZED)
  }

  const userId = verifyJwt(token)
  if (!userId) {
    throw new CustomError(AuthError.NOT_AUTHENTICATED, StatusCodes.UNAUTHORIZED)
  }

  //   const user = await userRepository.findById(userId)
  //   if (!user) {
  //     throw new CustomError(AuthError.USER_NOT_FOUND, StatusCodes.UNAUTHORIZED)
  //   }

  //   ;(req as unknown as any).currentUser = user
  next()
}
