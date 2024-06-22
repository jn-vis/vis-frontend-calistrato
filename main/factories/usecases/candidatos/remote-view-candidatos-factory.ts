import { RemoteViewCandidatos } from '@/data/candidatos/remote-view-candidatos'
import { ViewCandidatos } from '@/domain/usecases/candidato/view-candidato'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

//TODO -> alterar client para decorators de autenticação
export const makeRemoteViewCandidatos = (): ViewCandidatos =>
new RemoteViewCandidatos(makeApiUrl(`/candidatos`), makeAxiosHttpClient())
