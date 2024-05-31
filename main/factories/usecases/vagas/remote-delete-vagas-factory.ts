import { RemoteDeleteVagas } from '@/data/vagas/usecases/remote-delete-vagas'
import { DeleteVagas } from '@/domain/vagas/usecases/delete-vagas'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteDeleteVagas = (id: string | null): DeleteVagas =>
new RemoteDeleteVagas(makeApiUrl(`/vagas/${id}`), makeAxiosHttpClient())
