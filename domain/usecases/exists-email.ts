export interface EmailParams {
    email: string;
    signal?: AbortSignal;
}

export interface EmailExistsRepository {
    email(params: EmailParams): Promise<any>;
}
