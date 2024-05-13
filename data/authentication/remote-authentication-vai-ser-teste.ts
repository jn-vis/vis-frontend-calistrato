// import { RemoteAuthentication } from "./remote-authentication"
// import { HttpPostClientSpy } from "@/data/test";
// import { HttpStatusCode } from "@/data/protocols/http";
// import { mockAccountModel, mockAuthentication } from "@/domain/test"

// import { AuthenticationParams } from "@/domain/usecases";
// import { AccountModel } from "@/domain/models";
// import casual from 'casual';
// import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";

// type SutTypes = {
//     sut: RemoteAuthentication
//     httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
// }
// const mockDomain = casual.domain;
// const makeSut = (url: string = mockDomain): SutTypes => {
//     const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
//     const sut = new RemoteAuthentication(url, httpPostClientSpy)

//     return {
//         sut,
//         httpPostClientSpy
//     }
// }

// describe('RemoteAuthentication', () => {
//     test('Should call HttpPostClient  with correct URL', async () => {
//         const url = mockDomain
//        const {sut, httpPostClientSpy} = makeSut(url)
//        await sut.auth(mockAuthentication())
//        expect(httpPostClientSpy.url).toBe(url)
//     })

//     test('Should call HttpPostClient  with correct URL', async () => {
//        const {sut, httpPostClientSpy} = makeSut()
//        const authenticationParams = mockAuthentication()
//        await sut.auth(authenticationParams)
//        expect(httpPostClientSpy.body).toEqual(authenticationParams)
//     })

//     test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
//         const {sut, httpPostClientSpy} = makeSut()
//         httpPostClientSpy.response = {
//             statusCode: HttpStatusCode.unauthorized
//         }
//         const promise = sut.auth(mockAuthentication())
//         await expect(promise).rejects.toThrow(new InvalidCredentialsError())
//      })

//      test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
//         const {sut, httpPostClientSpy} = makeSut()
//         httpPostClientSpy.response = {
//             statusCode: HttpStatusCode.badRequest
//         }
//         const promise = sut.auth(mockAuthentication())
//         await expect(promise).rejects.toThrow(new UnexpectedError())
//      })

//      test('Should throw ServerError if HttpPostClient returns 500', async () => {
//         const {sut, httpPostClientSpy} = makeSut()
//         httpPostClientSpy.response = {
//             statusCode: HttpStatusCode.forbidden
//         }
//         const promise = sut.auth(mockAuthentication())
//         await expect(promise).rejects.toThrow(new UnexpectedError())
//      })

//      test('Should throw NotFoundError if HttpPostClient returns 404', async () => {
//         const {sut, httpPostClientSpy} = makeSut()
//         httpPostClientSpy.response = {
//             statusCode: HttpStatusCode.notFound
//         }
//         const promise = sut.auth(mockAuthentication())
//         await expect(promise).rejects.toThrow(new UnexpectedError())
//      })

//      test('Should return an AccountModel if HttppostClient returns 200', async () => {
//         const {sut, httpPostClientSpy} = makeSut()
//         const httpResult = mockAccountModel()
//         httpPostClientSpy.response = {
//             statusCode: HttpStatusCode.ok,
//             body: httpResult
//         }
//         const account = await sut.auth(mockAuthentication())
//         expect(account).toEqual(httpResult)
//      })
// })

export{}
