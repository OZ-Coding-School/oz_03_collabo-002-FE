import 'dotenv/config';
import { S3Client, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __filename과 __dirname을 ES 모듈에서 사용할 수 있도록 변환
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// S3 클라이언트 설정
const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.NCP_ACCESS_KEY_ID,
    secretAccessKey: process.env.NCP_SECRET_ACCESS_KEY,
  },
});

// 파일 업로드 함수
const uploadFile = async (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  const key = path.relative(path.join(__dirname, 'dist'), filePath);
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: fileStream,
  });

  try {
    await s3.send(command);
    console.log(`Uploaded: ${key}`);
  } catch (err) {
    console.error(`Failed to upload file ${key}: ${err.message}`);
  }
};

// S3 버킷의 파일 목록 가져오기
const listBucketFiles = async () => {
  const command = new ListObjectsCommand({ Bucket: process.env.BUCKET_NAME });
  try {
    const response = await s3.send(command);
    return response.Contents ? response.Contents.map((item) => item.Key) : [];
  } catch (err) {
    console.error(`Failed to list objects: ${err.message}`);
    return [];
  }
};

// 파일 삭제 함수
const deleteFile = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  try {
    await s3.send(command);
    console.log(`Deleted: ${key}`);
  } catch (err) {
    console.error(`Failed to delete file ${key}: ${err.message}`);
  }
};

// 디렉토리 내의 파일을 업로드 및 삭제
const syncDirectory = async (directory) => {
  const localFiles = new Set();
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await syncDirectory(fullPath);
    } else {
      const key = path.relative(path.join(__dirname, 'dist'), fullPath);
      localFiles.add(key);
      await uploadFile(fullPath);
    }
  }

  // 기존 파일 목록과 비교하여 삭제할 파일 확인
  const bucketFiles = await listBucketFiles();
  for (const file of bucketFiles) {
    if (!localFiles.has(file)) {
      await deleteFile(file);
    }
  }
};

// 스크립트 실행
syncDirectory(path.join(__dirname, 'dist'))
  .then(() => console.log('Deployment completed.'))
  .catch((err) => console.error('Error during deployment:', err));
