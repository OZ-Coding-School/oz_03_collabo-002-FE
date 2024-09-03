import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

// NCP Object Storage 설정
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard'; // NCP의 리전
const accessKeyId = process.env.NCP_ACCESS_KEY_ID;
const secretAccessKey = process.env.NCP_SECRET_ACCESS_KEY;
const bucketName = process.env.NCP_BUCKET_NAME;

const s3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
});

// 파일을 업로드하는 함수
const uploadFile = async (filePath, key) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ACL: 'public-read', // 파일 업로드 시 전체 공개 권한 부여
  };
  return s3.upload(params).promise();
};

// 디렉토리의 파일을 동기화하는 함수
const syncDirectory = async (directory, baseDir) => {
  const files = fs.readdirSync(directory);

  const uploadPromises = files.map(async (file) => {
    const fullPath = path.join(directory, file);
    const relativePath = path.relative(baseDir, fullPath);

    if (fs.statSync(fullPath).isDirectory()) {
      await syncDirectory(fullPath, baseDir);
    } else {
      await uploadFile(fullPath, relativePath);
    }
  });

  await Promise.all(uploadPromises);
};

// 스크립트 실행
const distDir = path.join(process.cwd(), 'dist');
syncDirectory(distDir, distDir)
  .then(() => console.log('Deployment completed.'))
  .catch((err) => console.error('Error during deployment:', err));