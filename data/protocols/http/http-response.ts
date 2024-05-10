export enum HttpStatusCode {
    ok = 200,
    created = 201,
    accepted = 202,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    conflict = 409
}

export type HttpResponse<T> = {
    statusCode: HttpStatusCode
    body?: any
}
