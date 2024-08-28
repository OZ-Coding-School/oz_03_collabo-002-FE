const LineClientId = import.meta.env.VITE_LINE_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_REDIRECT_URL;

function generateRandomState(length: number = 32): string {
  const characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result: string = '';
  for (let i: number = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const state: string = generateRandomState();
sessionStorage.setItem('lineOAuthState', state);

const LineUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LineClientId}&redirect_uri=${redirect_uri}&state=${state}&scope=profile%20openid`;

export const handleLine = () => {
  window.location.href = LineUrl;
};
