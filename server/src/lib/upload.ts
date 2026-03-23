// server/src/lib/upload.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.R2_BUCKET_NAME!
const PUBLIC_URL = process.env.R2_PUBLIC_URL!

export async function uploadPhotos(
  files: Express.Multer.File[]
): Promise<string[]> {
  const uploads = files.map(async (file) => {
    const ext = file.mimetype.split('/')[1]
    const key = `memories/${randomUUID()}.${ext}`

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: 'public, max-age=31536000',
      })
    )

    return `${PUBLIC_URL}/${key}`
  })

  return Promise.all(uploads)
}