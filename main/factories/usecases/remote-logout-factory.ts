import { RemoteEmailExists } from '@/data/login/usecases/remote-email-exists'
import { RemoteLogout } from '@/data/login/usecases/remote-logout'
import { EmailExistsRepository } from '@/domain/usecases/exists-email'
import { LogoutRepository } from '@/domain/usecases/logout'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemoteLogout = (email: string): LogoutRepository =>
new RemoteLogout(makeApiUrl(`/login/${email}`), makeAxiosHttpClient())
