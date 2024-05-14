import { RemotePreRegistration } from '@/data/usecases/remote-pre-registration'
import { PreRegistrationRepository } from '@/domain/usecases/pre-registration'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemotePreRegistration = (email: string): PreRegistrationRepository =>
new RemotePreRegistration(makeApiUrl(`/login/${email}/pre-registration`), makeAxiosHttpClient())
