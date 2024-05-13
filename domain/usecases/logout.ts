export interface DeleteParams {
    email: string;
    signal?: AbortSignal;
}


export interface LogoutRepository {
    logout(params: DeleteParams): Promise<any>;
}
