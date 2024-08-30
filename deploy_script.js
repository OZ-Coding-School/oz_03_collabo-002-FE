import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

// NCP Object Storage 설정
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard'; // NCP의 리전
const accessKeyId = process.env.VITE_NCP_ACCESS_KEY_ID;
const secretAccessKey = process.env.VITE_NCP_SECRET_ACCESS_KEY;
const bucketName = process.env.NCP_BUCKET_NAME;

const s3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
});

// 디렉토리 내의 파일을 업로드 및 삭제
const syncDirectory = async (directory, baseDir) => {
  const localFiles = new Set();
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (fs.statSync(fullPath).isDirectory()) {
      await syncDirectory(fullPath, baseDir);
    } else {
      localFiles.add(relativePath);
      await uploadFile(fullPath, relativePath);
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
const distDir = path.join(process.cwd(), 'dist');
syncDirectory(distDir, distDir)
  .then(() => console.log('Deployment completed.'))
  .catch((err) => console.error('Error during deployment:', err));