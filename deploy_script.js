import axios from 'axios';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dayjs from 'dayjs';

// 환경 변수
const endpoint = 'https://kr.object.ncloudstorage.com';
const bucketName = process.env.NCP_BUCKET_NAME;
const accessKey = process.env.NCP_ACCESS_KEY_ID;
const secretKey = process.env.NCP_SECRET_ACCESS_KEY;
const region = 'your-region'; // 예: 'ap-northeast-2'
const service = 's3'; // NCP와 같은 경우 실제 서비스에 맞게 조정
const date = dayjs().format("YYYYMMDD'T'HHmmss'Z'");
const dateStamp = dayjs().format('YYYYMMDD');

// 공통 요청 헤더 설정
const getAuthHeader = (method, uri, contentLength, payload) => {
  const amzDate = dayjs().format('YYYYMMDD\'T\'HHmmss\'Z\'');
  const payloadHash = crypto.createHash('sha256').update(payload || '').digest('hex');

  // Canonical Request 준비
  const canonicalRequest = [
    method,
    uri,
    '',
    `host:${new URL(endpoint).host}`,
    `x-amz-date:${amzDate}`,
    `x-amz-content-sha256:${payloadHash}`,
    '',
    'host;x-amz-date;x-amz-content-sha256',
    payloadHash
  ].join('\n');

  // String to Sign 준비
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    `${dateStamp}/${region}/${service}/aws4_request`,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex')
  ].join('\n');

  // Signature 준비
  const dateKey = crypto.createHmac('sha256', `AWS4${secretKey}`).update(dateStamp).digest();
  const dateRegionKey = crypto.createHmac('sha256', dateKey).update(region).digest();
  const dateRegionServiceKey = crypto.createHmac('sha256', dateRegionKey).update(service).digest();
  const signingKey = crypto.createHmac('sha256', dateRegionServiceKey).update('aws4_request').digest();
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  return {
    Authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${dateStamp}/${region}/${service}/aws4_request, SignedHeaders=host;x-amz-date;x-amz-content-sha256, Signature=${signature}`,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
    'Content-Length': contentLength || 0,
    Host: new URL(endpoint).host
  };
};

const uploadFile = async (filePath, objectName) => {
  const fileContent = fs.readFileSync(filePath);
  const url = `${endpoint}/${bucketName}/${objectName}`;
  const headers = getAuthHeader(
    'PUT',
    `/${bucketName}/${objectName}`,
    fileContent.length,
    fileContent
  );
  headers['Content-Type'] = 'application/octet-stream';

  await axios.put(url, fileContent, { headers });
};

const deleteFile = async (objectName) => {
  const url = `${endpoint}/${bucketName}/${objectName}`;
  const headers = getAuthHeader('DELETE', `/${bucketName}/${objectName}`, 0);

  await axios.delete(url, { headers });
};

// 모든 파일 삭제 후 새 파일 업로드
const syncFiles = async () => {
  // 1. 기존 파일 목록을 가져와서 삭제
  const listFilesUrl = `${endpoint}/${bucketName}/`;
  const listFilesHeaders = getAuthHeader('GET', `/${bucketName}/`, 0);

  try {
    const listResponse = await axios.get(listFilesUrl, { headers: listFilesHeaders });
    const filesToDelete = listResponse.data.Contents.map(file => file.Key); // Assume list response contains file keys

    for (const file of filesToDelete) {
      await deleteFile(file);
    }
  } catch (error) {
    console.error('Error listing or deleting files:', error);
  }

  // 2. 현재 디렉토리의 파일들을 업로드
  const distDir = path.join(process.cwd(), 'dist');
  const files = fs.readdirSync(distDir);

  for (const file of files) {
    const fullPath = path.join(distDir, file);

    // 디렉토리인지 파일인지 확인
    if (fs.statSync(fullPath).isFile()) {
      const relativePath = path.relative(distDir, fullPath);

      // 파일 업로드
      await uploadFile(fullPath, relativePath);
    }
  }
};

syncFiles().catch(console.error);
