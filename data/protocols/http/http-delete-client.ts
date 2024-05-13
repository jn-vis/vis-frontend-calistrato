import { HttpResponse } from "."

export type HttpDeleteParams<T> = {
    url: string
}


export interface HttpDeleteClient<T, R> {
    delete(params: HttpDeleteParams<T>): Promise<HttpResponse<R>>
}
