import axios from 'axios';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { format } from 'date-fns';

// 환경 변수
const endpoint = 'https://kr.object.ncloudstorage.com';
const bucketName = process.env.NCP_BUCKET_NAME;
const accessKey = process.env.NCP_ACCESS_KEY_ID;
const secretKey = process.env.NCP_SECRET_ACCESS_KEY;
const date = format(new Date(), "yyyyMMdd'T'HHmmss'Z'");

// 공통 요청 헤더 설정
const getAuthHeader = (method, uri, contentLength) => {
  const stringToSign = `${method}\n\n\n${contentLength}\n\n\n${uri}`;
  const signature = crypto.createHmac('sha256', secretKey).update(stringToSign).digest('hex');
  return `AWS ${accessKey}:${signature}`;
};

const uploadFile = async (filePath, objectName) => {
  const fileContent = fs.readFileSync(filePath);
  const url = `${endpoint}/${bucketName}/${objectName}`;
  const headers = {
    'Authorization': getAuthHeader('PUT', `/${bucketName}/${objectName}`, fileContent.length),
    'x-amz-date': date,
    'x-amz-content-sha256': crypto.createHash('sha256').update(fileContent).digest('hex'),
    'Content-Length': fileContent.length,
    'Content-Type': 'application/octet-stream',
    'Host': new URL(endpoint).host,
  };

  await axios.put(url, fileContent, { headers });
};

const deleteFile = async (objectName) => {
  const url = `${endpoint}/${bucketName}/${objectName}`;
  const headers = {
    'Authorization': getAuthHeader('DELETE', `/${bucketName}/${objectName}`, 0),
    'x-amz-date': date,
    'Host': new URL(endpoint).host,
  };

  await axios.delete(url, { headers });
};

// 스크립트 실행 예시
const distDir = path.join(process.cwd(), 'dist');
const files = fs.readdirSync(distDir);

for (const file of files) {
  const fullPath = path.join(distDir, file);
  const relativePath = path.relative(distDir, fullPath);

  // 파일 업로드
  await uploadFile(fullPath, relativePath);
}

// 삭제할 파일 목록 예시 (실제 구현에서는 필요에 따라 파일 목록을 유지하거나 수정)
const filesToDelete = ['path/to/old-file.txt']; // 예시 파일 경로
for (const file of filesToDelete) {
  await deleteFile(file);
}