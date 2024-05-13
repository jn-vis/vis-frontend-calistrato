

export type PreRegistrationParams = {
    email: string
    goal: string
    channel: string
}


export interface PreRegistrationRepository {
    registration(params: PreRegistrationParams): Promise<any>
}

