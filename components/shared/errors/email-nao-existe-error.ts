import { UseCaseError } from "@/core/errors/use-case-error"


export class EmailNaoExisteError extends Error implements UseCaseError {
  constructor(error: any) {
    super()
    this.statusCode = 404
    this.message = `Email não existe no banco de dados: ${error}`
  }

  statusCode: number
}
