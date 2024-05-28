import { RemoteEditVagas } from '@/data/vagas/usecases/remote-edit-vagas'
import { EditVagas } from '@/domain/vagas/usecases/edit-vagas'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

//TODO -> alterar client para decorators de autenticação
export const makeRemoteEditVagas = (id: number): EditVagas =>
new RemoteEditVagas(makeApiUrl(`/vagas/${id}`), makeAxiosHttpClient())
