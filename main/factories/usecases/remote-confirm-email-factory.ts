import { RemoteConfirmEmail } from '@/data/login/usecases/remote-confirm-email'
import { ConfirmEmailRepository } from '@/domain/usecases/confirm-email'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemoteConfirmEmail = (email: string | null): ConfirmEmailRepository =>
new RemoteConfirmEmail(makeApiUrl(`/login/${email}/token`), makeAxiosHttpClient())
