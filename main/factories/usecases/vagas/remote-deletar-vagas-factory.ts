import { RemoteDeleteVagas } from '@/data/vagas/usecases/remote-deletar-vagas'
import { DeleteVagas } from '@/domain/vagas/usecases/deletar-vagas'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteDeletarVagas = (id: string): DeleteVagas =>
new RemoteDeleteVagas(makeApiUrl(`/vagas/${id}`), makeAxiosHttpClient())
