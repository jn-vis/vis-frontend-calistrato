import { RemoteTokenLanguage } from '@/data/usecases/remote-token-language'
import { RemoteTokenPassword } from '@/data/usecases/remote-token-password'
import { TokenLanguageRepository } from '@/domain/usecases/token-language'
import { TokenPasswordRepository } from '@/domain/usecases/token-password'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemoteTokenPassword = (email: string): TokenPasswordRepository =>
new RemoteTokenPassword(makeApiUrl(`/login/${email}/password`), makeAxiosHttpClient())
