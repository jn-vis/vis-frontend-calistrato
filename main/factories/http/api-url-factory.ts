export const makeApiUrl = (path: string): string => `${process.env.API_URL ?? 'http://localhost:8080'}${path}`
