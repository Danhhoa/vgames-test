export class CustomError {
  message!: string
  status!: number
  translationParams?: any

  constructor(message: string, status: number = 500, translationParams?: any) {
    this.message = message
    this.status = status
    this.translationParams = translationParams
  }
}
