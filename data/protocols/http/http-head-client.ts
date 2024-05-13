import { HttpResponse } from "."

export type HttpHeadParams<T> = {
    url: string
}


export interface HttpHeadClient<T, R> {
    head(params: HttpHeadParams<T>): Promise<HttpResponse<R>>
}
