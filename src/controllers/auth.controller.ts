import * as crypto from 'crypto'
import {Request, Response} from 'express'
import {generateJwtToken} from '../utils/auth'

class AuthController {
  async nonce(req: Request, res: Response) {
    const nonce = crypto.randomBytes(32).toString('hex')

    return res.send({
      success: true,
      data: nonce,
    })
  }

  async login(req: Request, res: Response) {
    const {refCode} = req.body

    if (!refCode) {
      throw new Error('reference code is missing')
    }

    const token = generateJwtToken({})

    return res.send({
      success: true,
      data: token,
    })
  }
}

export default new AuthController()
