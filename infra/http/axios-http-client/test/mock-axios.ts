import axios from "axios"
import casual from "casual"

export const mockAxios = (): jest.Mocked<typeof axios> => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValue({
        data: casual.random_element,
        status: casual.random
    })
    return mockedAxios
}

