import { Client } from 'node-appwrite'

import type { AppwriteContext } from './types'

export default async (context: AppwriteContext) => {
  const { req, res, log, error } = context

  if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_FUNCTION_PROJECT_ID) {
    error('APPWRITE_ENDPOINT is not defined')
    return res.send('Failed!', 500)
  }

  log(req.path)

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)

  if (req.headers['x-appwrite-user-jwt']) {
    client.setJWT(req.headers['x-appwrite-user-jwt'])
  } else {
    error('JWT not found')
    return res.send('Please sign in, JWT not found', 401)
  }

  try {
    const parts = req.path.split('/').filter((part) => part)
    switch (parts[0]) {
      default:
        error(`Invalid operation: ${req.path}`)
    }
  } catch (e: any) {
    error('Failed to run service: ' + e.message)
    return res.send('Failed!', 500)
  }

  return res.send('OK!', 200)
}
