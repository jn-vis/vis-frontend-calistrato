
import { RemoteInativarVagas } from '@/data/vagas/usecases/remote-inativar-vagas'
import { InativarVagas } from '@/domain/vagas/usecases/inativar-vagas'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteInativarVagas = (id: string | null): InativarVagas =>
new RemoteInativarVagas(makeApiUrl(`/vagas/${id}`), makeAxiosHttpClient())
