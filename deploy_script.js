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
  };
  return s3.upload(params).promise();
};

// 파일을 삭제하는 함수
const deleteFile = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  return s3.deleteObject(params).promise();
};

// 버킷에 있는 파일 목록을 가져오는 함수
const listBucketFiles = async () => {
  const params = {
    Bucket: bucketName,
  };
  const data = await s3.listObjectsV2(params).promise();
  return data.Contents.map(item => item.Key);
};

// 디렉토리의 파일을 동기화하는 함수
const syncDirectory = async (directory, baseDir) => {
  const localFiles = new Set();
  const files = fs.readdirSync(directory);

  const uploadPromises = files.map(async (file) => {
    const fullPath = path.join(directory, file);
    const relativePath = path.relative(baseDir, fullPath);

    if (fs.statSync(fullPath).isDirectory()) {
      await syncDirectory(fullPath, baseDir);
    } else {
      localFiles.add(relativePath);
      await uploadFile(fullPath, relativePath);
    }
  });

  await Promise.all(uploadPromises);

  const bucketFiles = await listBucketFiles();
  const deletePromises = bucketFiles
    .filter(file => !localFiles.has(file))
    .map(file => deleteFile(file));

  await Promise.all(deletePromises);
};

// 스크립트 실행
const distDir = path.join(process.cwd(), 'dist');
syncDirectory(distDir, distDir)
  .then(() => console.log('Deployment completed.'))
  .catch((err) => console.error('Error during deployment:', err));
