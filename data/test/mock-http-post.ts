import casual from "casual";
import { HttpPostParams } from "../protocols/http";

export const mockPostRequest = (): HttpPostParams<any> => ({
    url: casual.url,
    body: casual.random_element
})