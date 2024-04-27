import { UseCaseError } from "@/core/errors/use-case-error"


export class EmailNaoConfirmadoError extends Error implements UseCaseError {
  constructor(error: any) {
    super()
    this.statusCode = 409
    this.message = `Ocorreu um erro ao confirmar o login: ${error}`
  }

  statusCode: number
}
