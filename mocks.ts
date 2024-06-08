import { Client } from 'node-appwrite'

import type { AppwriteContext } from './src/types'

export const mockClient: Client = {
  setEndpoint: (endpoint: string) => mockClient,
  setProject: (projectId: string) => mockClient,
  setJWT: (jwt: string) => mockClient,
  setSelfSigned: function (status?: boolean): Client {
    throw new Error('Function not implemented.')
  },
  setKey: function (key: string): Client {
    throw new Error('Function not implemented.')
  },
  setLocale: function (locale: string): Client {
    throw new Error('Function not implemented.')
  },
  setSession: function (session: string): Client {
    throw new Error('Function not implemented.')
  },
  setForwardedUserAgent: function (forwardeduseragent: string): Client {
    throw new Error('Function not implemented.')
  },
}

export const mockContext: AppwriteContext = {
  req: {
    bodyRaw: '',
    body: {},
    headers: {},
    scheme: 'http',
    method: 'GET',
    url: 'http://localhost:3000',
    host: 'localhost',
    port: 3000,
    path: '/',
    queryString: '',
    query: {},
  },
  res: {
    json: (body: Record<string, any>) => {
      console.log(body)
      return body
    },
    empty: () => {
      console.log('empty')
      return ''
    },
    redirect: (url: string, status?: number) => console.log(url, status),
    send: (body: string, status?: number, headers?: Record<string, string>) => {
      console.log(body, status, headers)
      return {
        body,
        status,
        headers,
      }
    },
  },
  log: console.log,
  error: console.error,
}
