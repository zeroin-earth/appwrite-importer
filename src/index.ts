import { Client, Databases, ID, Storage } from 'node-appwrite'
import parse from 'csv-simple-parser'

import type { AppwriteContext } from './types'

export default async (context: AppwriteContext) => {
  const { req, res, log, error } = context

  if (
    !process.env.APPWRITE_ENDPOINT ||
    !process.env.APPWRITE_FUNCTION_PROJECT_ID ||
    !process.env.APPWRITE_API_KEY
  ) {
    error('APPWRITE_ENDPOINT is not defined')
    return res.send('Failed!', 500)
  }

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY)

  const { databaseId, fileId, bucketId, collectionId } = JSON.parse(req.body)

  if (!databaseId || !fileId || !bucketId || !collectionId) {
    error(
      'Missing required parameters from body "databaseId", "fileId", "collectionId" or "bucketId"',
    )
    return res.send('Failed!', 400)
  }

  const storage = new Storage(client)
  const databases = new Databases(client)

  let result
  let file

  try {
    file = await storage.getFile(bucketId, fileId)

    if (file.name.search('-imported_') >= 0) {
      return res.send('File already imported!', 400)
    }

    result = await storage.getFileDownload(bucketId, fileId)
  } catch (e: any) {
    error(e)
    return res.send('Failed!', 500)
  }

  const decoder = new TextDecoder()
  const str = decoder.decode(result)
  const data = parse(str, { delimiter: ',', header: true })

  log(`Importing ${data.length} records`)

  data.forEach(async (item) => {
    try {
      await databases.createDocument(databaseId, collectionId, ID.unique(), item)
    } catch (e: any) {
      error(e)
      return res.send('Failed!', 500)
    }
  })

  await storage.updateFile(bucketId, fileId, `${file.name}-imported_${new Date().toISOString()}`)

  return res.send('OK!', 200)
}
