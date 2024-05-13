
import { AuthenticationParams } from '@/domain/usecases/'
import { AccountModel } from '../models'
import casual from 'casual'



export const mockAuthentication = (): AuthenticationParams => ({
     email: casual.email,
     password: casual.password
})

export const mockAccountModel = (): AccountModel => ({
     accessToken: casual.uuid
})

