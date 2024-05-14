

import { AccountModel } from '../models'
import casual from 'casual'



export const mockAuthentication = (): AuthenticationParams => ({
     email: casual.email,
     password: casual.password
})

export const mockAccountModel = (): AccountModel => ({
     sessionToken: casual.uuid,
     user: casual.email
})

