import {Request, Response, NextFunction, Router} from 'express'

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any> | any

export class CustomRoute {
  private router: Router

  constructor() {
    this.router = Router()
  }

  getRouter() {
    return this.router
  }

  GET(path: string, ...handlers: RouterHandler[]) {
    return this.handle('get', path, handlers)
  }

  POST(path: string, ...handlers: RouterHandler[]) {
    return this.handle('post', path, handlers)
  }

  PATCH(path: string, ...handlers: RouterHandler[]) {
    return this.handle('patch', path, handlers)
  }

  PUT(path: string, ...handlers: RouterHandler[]) {
    return this.handle('put', path, handlers)
  }

  DELETE(path: string, ...handlers: RouterHandler[]) {
    return this.handle('delete', path, handlers)
  }

  private handle(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    handlers: RouterHandler[],
  ) {
    const handler = handlers.pop()
    return this.router[method](path, ...handlers, async (req, res, next) => {
      try {
        await handler!(req, res, next)
      } catch (error: any) {
        console.error(error)
        const errors = JSON.parse(JSON.stringify(error))
        if (errors.message) {
          // @ts-ignore
          errors.message = req.t(errors.message, errors.translationParams)
        }
        const {translationParams, ...errorResponse} = errors

        return res.status(error.status || 500).send({
          success: false,
          errors: errorResponse,
        })
      }
    })
  }
}
