const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_REDIRECT_URL;
const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${redirect_uri}&state=google`;

export const handleGoogle = () => {
  window.location.href = googleUrl;
};
