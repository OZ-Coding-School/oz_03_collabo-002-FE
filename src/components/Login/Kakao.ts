const KakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_REDIRECT_URL;

console.log('전체 환경 변수:', import.meta.env);
console.log('VITE_KAKAO_CLIENT_ID:', KakaoClientId);
console.log('VITE_REDIRECT_URL:', redirect_uri);

const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoClientId}&redirect_uri=${redirect_uri}&response_type=code&state=kakao`;

export const handleKaKao = () => {
  console.log('카카오 로그인 URL:', kakaoURL);
  // 5초 후에 리다이렉션
  setTimeout(() => {
    window.location.href = kakaoURL;
  }, 5000);
};
