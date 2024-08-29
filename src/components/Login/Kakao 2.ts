const KakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_REDIRECT_URL;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoClientId}&
redirect_uri=${redirect_uri}&response_type=code&state=kakao`;

export const handleKaKao = () => {
  window.location.href = kakaoURL;
};
