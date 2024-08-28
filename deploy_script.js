import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __filename과 __dirname을 ES 모듈에서 사용할 수 있도록 변환
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// NCP Object Storage 설정
const endpoint = new AWS.Endpoint(process.env.NCP_BASE_URL); // NCP의 엔드포인트 URL
const region = 'kr-standard'; // NCP의 리전
const accessKeyId = process.env.NCP_ACCESS_KEY_ID;
const secretAccessKey = process.env.NCP_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

// 파일 업로드 함수
const uploadFile = async (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  const key = path.relative(path.join(__dirname, 'dist'), filePath);

  try {
    await s3.putObject({
      Bucket: process.env.NCP_BUCKET_NAME,
      Key: key,
      Body: fileStream,
      ACL: 'public-read', // ACL을 설정하여 파일 접근 권한 설정
    }).promise();
    console.log(`Uploaded: ${key}`);
  } catch (err) {
    console.error(`Failed to upload file ${key}: ${err.message}`);
  }
};

// Object Storage의 파일 목록 가져오기
const listBucketFiles = async () => {
  const params = {
    Bucket: process.env.NCP_BUCKET_NAME,
    MaxKeys: 1000, // 최대 1000개 파일 목록 조회
  };

  try {
    const response = await s3.listObjectsV2(params).promise();
    return response.Contents ? response.Contents.map((item) => item.Key) : [];
  } catch (err) {
    console.error(`Failed to list objects: ${err.message}`);
    return [];
  }
};

// 파일 삭제 함수
const deleteFile = async (key) => {
  try {
    await s3.deleteObject({
      Bucket: process.env.NCP_BUCKET_NAME,
      Key: key,
    }).promise();
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