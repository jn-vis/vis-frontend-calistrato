import { RemoteAuthentication } from '@/data/usecases/remote-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemoteAuthentication = (email: string): Authentication =>
  new RemoteAuthentication(makeApiUrl(`/login/${email}`), makeAxiosHttpClient())
