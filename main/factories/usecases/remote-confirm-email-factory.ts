import { RemoteConfirmEmail } from '@/data/usecases/remote-confirm-email'
import { ConfirmEmailRepository } from '@/domain/usecases/confirm-email'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'


export const makeRemoteConfirmEmail = (email: string): ConfirmEmailRepository =>
new RemoteConfirmEmail(makeApiUrl(`/login/${email}/token`), makeAxiosHttpClient())
