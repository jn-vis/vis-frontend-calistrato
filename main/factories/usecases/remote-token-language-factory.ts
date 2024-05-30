import { RemoteTokenLanguage } from '@/data/login/usecases/remote-token-language'
import { TokenLanguageRepository } from '@/domain/usecases/token-language'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemoteTokenLanguage = (email: string | null, language: string): TokenLanguageRepository =>  {
    return new RemoteTokenLanguage(makeApiUrl(`/login/${email}/token/language/${language}`), makeAxiosHttpClient())
}
