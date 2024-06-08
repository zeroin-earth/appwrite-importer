export type AppwriteContext = {
  req: AppwriteRequest
  res: AppwriteResponse
  log: (message: string) => void
  error: (message: string) => void
}

type Headers =
  | 'x-appwrite-trigger'
  | 'x-appwrite-event'
  | 'x-appwrite-user-id'
  | 'x-appwrite-user-jwt'
  | 'x-appwrite-country-code'
  | 'x-appwrite-continent-code'
  | 'x-appwrite-continent-eu'
  | (string & {})

type AppwriteRequest = {
  bodyRaw: string
  body: Record<string, any>
  headers: Record<Headers, string>
  scheme: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  host: string
  port: number
  path: string
  queryString: string
  query: Record<string, string>
}

type AppwriteResponse = {
  empty: () => void
  json: (body: Record<string, any>) => void
  redirect: (url: string, status?: number) => void
  send: (body: string, status?: number, headers?: Record<string, string>) => void
}
