import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

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

// 모든 파일을 삭제하는 함수
const deleteAllObjects = async (bucketName) => {
  const listedObjects = await s3.listObjectsV2({ Bucket: bucketName }).promise();

  if (listedObjects.Contents.length === 0) return; // 삭제할 객체가 없는 경우 바로 종료

  const deleteParams = {
    Bucket: bucketName,
    Delete: { Objects: listedObjects.Contents.map(({ Key }) => ({ Key })) }
  };

  await s3.deleteObjects(deleteParams).promise();

  // IsTruncated가 true일 경우 다음 페이지에 파일이 더 있는지 확인
  if (listedObjects.IsTruncated) await deleteAllObjects(bucketName); 
};

// 파일을 업로드하는 함수
const uploadFile = async (filePath, key) => {
  const fileContent = fs.readFileSync(filePath);
  let contentType = mime.lookup(filePath) || 'application/octet-stream'; // MIME 타입 설정

  // 업로드 설정
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ACL: 'public-read', // 공개 접근 허용
    ContentType: contentType,
    ContentDisposition: 'inline' // 브라우저에서 열리도록 설정
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
      // 디렉토리 내 파일 동기화
      await syncDirectory(fullPath, baseDir);
    } else {
      // 파일 업로드
      await uploadFile(fullPath, relativePath);
    }
  });

  await Promise.all(uploadPromises); // 모든 업로드 작업 완료 대기
};

// 스크립트 실행
const distDir = path.join(process.cwd(), 'dist');

const deploy = async () => {
  try {
    // 1. 기존 파일 모두 삭제
    await deleteAllObjects(bucketName);
    console.log('All objects deleted.');

    // 2. 새로운 파일 업로드
    await syncDirectory(distDir, distDir);
    console.log('Deployment completed.');
  } catch (err) {
    console.error('Error during deployment:', err);
  }
};

deploy();
