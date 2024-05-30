import { RemoteAuthentication } from '@/data/login/usecases/remote-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemoteAuthentication = (email: string | null): Authentication =>
  new RemoteAuthentication(makeApiUrl(`/login/${email}`), makeAxiosHttpClient())
