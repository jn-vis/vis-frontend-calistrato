import { RemoteAddVagas } from '@/data/vagas/usecases/remote-cadastro-vagas'
import { AddVagas } from '@/domain/vagas/usecases/add-vagas'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

//TODO -> alterar client para decorators de autenticação
export const makeRemoteAddVagas = (): AddVagas =>
new RemoteAddVagas(makeApiUrl(`/vagas`), makeAxiosHttpClient())
