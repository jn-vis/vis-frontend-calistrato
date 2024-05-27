import { RemoteViewVagas } from '@/data/vagas/usecases/remote-view-vagas'
import { ViewVagas } from '@/domain/vagas/usecases/view-vagas'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

//TODO -> alterar client para decorators de autenticação
export const makeRemoteViewVagas = (): ViewVagas =>
new RemoteViewVagas(makeApiUrl(`/vagas`), makeAxiosHttpClient())
