import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

export async function uploadToR2(key: string, buffer: Buffer, contentType: string) {
  // If R2 not configured, save locally as fallback
  if (!process.env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID === 'placeholder') {
    const fs = await import('fs/promises')
    const path = await import('path')
    const dir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, key.replace(/\//g, '-')), buffer)
    return `/uploads/${key.replace(/\//g, '-')}`
  }

  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }))
  return `${process.env.R2_PUBLIC_URL}/${key}`
}

export async function deleteFromR2(key: string) {
  if (!process.env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID === 'placeholder') return
  await r2.send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }))
}
