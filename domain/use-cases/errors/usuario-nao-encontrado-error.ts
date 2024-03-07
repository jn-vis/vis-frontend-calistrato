import { UseCaseError } from "@/core/errors/use-case-error"

export class UsuarioNaoEncontradoError extends Error implements UseCaseError {
    constructor() {
        super()
        this.statusCode = 404
        this.message = 'Usuário não encontrado'
    }
    statusCode: number
}
