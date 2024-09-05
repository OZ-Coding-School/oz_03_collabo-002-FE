import facebook from '../assets/icon/facebook.svg';
import kakao from '../assets/icon/kakao.svg';
import google from '../assets/icon/google.svg';
import line from '../assets/icon/line.svg';
import { Link, useNavigate } from 'react-router-dom';
import { handleKaKao } from '../components/Login/Kakao';
import { handleGoogle } from '../components/Login/Google';
import { handleLine } from '../components/Login/Line';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginUser } from '../type/loginuser';
import axios from 'axios';
import { useModalStore } from '../store/useModal';
import Modal from '../components/common/Modal';
import { useCallback, useState } from 'react';
import { useUserStore } from '../store/useUser';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const { showModal, setModal } = useModalStore();
  const [accessToken, setAccessToken] = useState<string>('');
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const clearValue = useCallback(() => {
    reset({
      email: '',
      password: '',
    });
  }, [reset]);

  const onSubmit: SubmitHandler<LoginUser> = useCallback(
    async (data) => {
      const { email, password } = data;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_CALLBACK_URL}login/`,
          {
            email,
            password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        console.log(response.data);

        localStorage.setItem('accessToken', response.data.access_token);
        console.log('accessToken: ', accessToken);
        setAccessToken(response.data.access_token);
        Cookies.set('refreshToken', response.data.refresh_token, {
          expires: 7,
          secure: true,
          sameSite: 'strict',
        });
        // setUser(response.data);
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          profile_image: response.data.profile_image,
        });
        setModal('Login Successful!');
        clearValue();
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setModal(
              `Login failed: ${error.response.data.message || 'Unknown error'}`,
            );
          } else if (error.request) {
            setModal('Network error. Please try again.');
          } else {
            setModal('An unexpected error occurred.');
          }
        } else {
          setModal('An unexpected error occurred.');
        }
        console.error('Login error:', error);
      }
    },
    [setUser, setModal, clearValue, navigate, accessToken],
  );

  return (
    <>
      {showModal && <Modal />}
      <div className="flex flex-col max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-gray-100">
        <div className=" border-gray-200 border-2 rounded-2xl bg-white mt-32 mx-8 py-20">
          <div className="mb-8 text-center ">
            <h2 className="text-2xl font-bold ">LOGIN</h2>
            <p className="text-gray-400">
              If you log in, you can apply for different classes!
            </p>
          </div>

          <div className="flex flex-col mx-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-7">
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-gray-700"
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Please enter your email"
                    required
                    // autoComplete="off"
                    className="border mt-1 block w-full rounded-xl text-sm border-gray-300 h-10 pl-3 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                    {...register('email', {
                      required: 'Please enter your email.',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        message: `*  Please enter a valid email address`,
                      },
                      validate: (value) =>
                        value.includes('@') || '* Email must contain @ symbol.',
                    })}
                  />
                  {errors.email && (
                    <p className="text-red px-2 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-gray-700"
                  >
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Please enter your password"
                    required
                    className="border mt-1 block w-full rounded-xl text-sm border-gray-300 h-10 pl-3 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                    {...register('password', {
                      required: 'Please enter your password',
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                        message: "*  Password doesn't meet the requirements.",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  className="bg-primary text-white w-full rounded-xl h-10"
                  type="submit"
                >
                  LOGIN
                </button>
              </div>
            </form>
            <div className="flex flex-col">
              {/* <label className="mb-3">소셜 로그인</label> */}
              <hr className="border-b-1 mb-6" />
              <button
                className="bg-[#FEE500] text-black w-full rounded-xl h-10 mb-3"
                onClick={handleKaKao}
              >
                <div className="flex justify-center">
                  {<img src={kakao} alt="kakao" className="mr-4 mt-0.5" />}
                  Login with Kakao
                </div>
              </button>
              {/* <button>
                <img src={kakao} alt="kakao" />
              </button> */}
              <button
                className="bg-[#03C75A] text-white w-full rounded-xl h-10 mb-3"
                onClick={handleLine}
              >
                <div className="flex justify-center">
                  <img src={line} alt="라인" className="mr-4" />
                  Login with Line
                </div>
              </button>
              <button className="bg-[#1877F2] text-white w-full rounded-xl h-10 mb-3 ">
                <div className="flex justify-center">
                  <img src={facebook} alt="페이스북" className="mr-4" />
                  Login with FaceBook
                </div>
              </button>
              <button
                className="bg-white text-black w-full rounded-xl h-10 mb-3"
                onClick={handleGoogle}
              >
                <div className="flex justify-center">
                  <img src={google} alt="구글" className="mr-4" />
                  Login with Google
                </div>
              </button>
            </div>
            <div className="mt-4 flex flex-col text-center">
              Do you need to sign up for membership ?
              <Link to="/signup" className="text-primary ml-3">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
