// import axios from 'axios';
import axios from '../api/axios';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import successCheck from '../assets/icon/success-check.svg';

interface ResponseData {
  message?: string;
  result?: {
    email?: string;
    profile_image: string;
  };
}

const Redirection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isState, setIsState] = useState<string | null>('');
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');

  useEffect(() => {
    setIsState(state);
    if (state !== 'google' && state !== 'kakao') {
      setIsState('line');
    }
    // console.log('isState:', isState);
    if (code && isState) {
      // console.log('Auth code:', code);
      // console.log('state:', state);
      // console.log('isstate:', isState);

      const fetchAuthLogin = async () => {
        try {
          // console.log('isState: ', isState);
          // const url = `${import.meta.env.VITE_CALLBACK_URL}${isState}/callback/`;
          // console.log('요청 URL: ', url);
          // console.log('body: ', code, state);

          const response = await axios.post(`/users/${isState}/callback/`, {
            code: code,
            state: state,
          });
          // const token = response.data;

          if (response) {
            setTimeout(() => {
              setIsLoading(false);
              setTimeout(() => {
                navigate('/');
              }, 2000);
            }, 2000);
          }
        } catch (error) {
          console.log('Error: ', error);
          if ((error as AxiosError).response) {
            console.log((error as AxiosError).response?.data);
            // const responseData = (error as AxiosError<ResponseData>).response
            //   ?.data;
            // (error as AxiosError<ResponseData>).response?.data.result;
            // console.log(responseData);
            console.log(
              (error as AxiosError<ResponseData>).response?.data.result,
            );
            const message = (error as AxiosError<ResponseData>).response?.data
              .message;
            // const result = (error as AxiosError<any>).response?.data.result;
            console.log(message);

            // if(result.email === '') {

            // }

            if (message === '이메일이 존재하지 않습니다.') {
              // console.log('hi');
              navigate('lineEmail');
            }
          }

          // if(error instanceof Error) {
          //   if(error.response.data.result === "이메일이 존재하지 않습니다.") {

          //   }
          // }
          setIsLoading(true);
        }
      };
      fetchAuthLogin();
    }
  }, [navigate, code, isState]);

  return (
    <div className="flex flex-col max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-gray-100">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
          <div className="flex flex-col items-center">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Logging in...
                </h2>
                <p className="text-gray-500 text-center">
                  We're processing your {isState} login. Please wait a moment.
                </p>
              </>
            ) : (
              <>
                <img
                  src={successCheck}
                  alt="성공"
                  className="w-16 h-16 text-green-500 mb-4"
                />
                {/* <svg
                  className="w-16 h-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg> */}
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Login Successful!
                </h2>
                <p className="text-gray-500 text-center">
                  You've been successfully logged in. Redirecting to the main
                  page...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redirection;
