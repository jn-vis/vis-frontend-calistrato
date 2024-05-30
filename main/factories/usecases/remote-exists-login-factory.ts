import { RemoteEmailExists } from '@/data/login/usecases/remote-email-exists'
import { EmailExistsRepository } from '@/domain/usecases/exists-email'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemoteEmailExists = (email: string | null): EmailExistsRepository =>
new RemoteEmailExists(makeApiUrl(`/login/${email}/token`), makeAxiosHttpClient())
