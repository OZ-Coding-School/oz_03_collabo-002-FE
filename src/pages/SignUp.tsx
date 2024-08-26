import facebook from '../assets/icon/facebook.svg';
import kakao from '../assets/icon/kakao.svg';
import google from '../assets/icon/google.svg';
import naver from '../assets/icon/naver.svg';
import signup_profile from '../assets/icon/signup_profile.svg';
import { Link } from 'react-router-dom';
import Modal from '../components/common/Modal';
import { useModalStore } from '../store/useModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Signup } from '../type/signup';

import { handleKaKao } from '../components/Login/Kakao';
import { handleGoogle } from '../components/Login/Google';
import axios from 'axios';

const SignUp = () => {
  const { setModal, showModal } = useModalStore();
  const handleChange = () => {
    setModal('Successful Membership Registration');
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Signup>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const clearValue = () => {
    reset({
      name: '',
      email: '',
      password: '',
    });
  };
  const onSubmit: SubmitHandler<Signup> = async (data) => {
    clearValue();
    try {
      const { name, email, password } = data;
      console.log('1');
      await axios.post(
        `https://customk-lb-26108994-e6e8d3346164.kr.lb.naverncp.com/api/v1/users/signup/`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      console.log('2');
      setModal('Successful Membership Registration');
      console.log('3');
    } catch (error) {
      console.error('Error during signup:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      setModal('Signup failed. Please try again.');
    }
  };

  return (
    <>
      {showModal && <Modal />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-gray-100">
          <div className=" border-gray-200 border-2 rounded-2xl bg-white mt-8 mx-8 py-16">
            <div className="mb-8 text-center ">
              <h2 className="text-2xl font-bold  ">Sign Up</h2>
            </div>
            <div className="flex flex-col mx-4">
              {/* <label className="mb-3">소셜 로그인</label> */}

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
              <button className="bg-[#03C75A] text-white w-full rounded-xl h-10 mb-3">
                <div className="flex justify-center">
                  <img src={naver} alt="페이스북" className="mr-4" />
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
            <hr className="border-b-1 mb-6 mx-4" />
            <div className="flex flex-col mx-4">
              <div className="mb-7">
                <div>
                  <div className="block text-xs font-bold text-gray-700 mb-4">
                    Sign up for membership by e-mail
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={signup_profile}
                      alt="프로필이미지"
                      className="size-216 rounded-full text-3xl overflow-visible mb-3"
                    />
                  </div>
                </div>

                <div className="mb-3 ">
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
                    className="border mt-1 block w-full rounded-xl text-sm border-gray-300 h-10 pl-3 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                    {...register('email', {
                      required: 'This is a mandatory item.',
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    })}
                  />
                  {errors.email && (
                    <p className="light-white px-2 text-xs">
                      * Please enter a valid email address.
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
                      required: 'This is a mandatory item.',
                      pattern:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                    })}
                  />
                  {errors.password && (
                    <p className="light-white px-2 text-xs">
                      * It must be at least 8 characters and contain all
                      English, numbers, and special characters.
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold text-gray-700"
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Please enter your name"
                    required
                    className="border mt-1 block w-full rounded-xl text-sm border-gray-300 h-10 pl-3 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                    {...register('name', {
                      required: 'This is a mandatory item.',
                      minLength: 2,
                      maxLength: 12,
                      pattern: /^[a-zA-Z0-9]+$/,
                    })}
                  />
                  {errors.name && (
                    <p className="light-white px-2 text-xs">
                      * Name can only contain English letters and numbers.
                    </p>
                  )}
                </div>
                <div className="text-xs mb-3">
                  <div className="flex felx-col mb-1">
                    <input
                      type="radio"
                      id="agree1"
                      name="agree1"
                      className="mr-2"
                    />
                    <p>
                      I agree to the terms and conditions{' '}
                      <span className="text-red-500">(required)</span>
                    </p>
                  </div>
                  <div className="flex felx-col">
                    <input
                      type="radio"
                      id="agree2"
                      name="agree2"
                      className="mr-2"
                    />
                    <p>
                      They are over 14 years old{' '}
                      <span className="text-primary">(required)</span>
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white w-full rounded-xl h-10"
                >
                  Sign Up
                </button>
                <div className="mt-4 flex flex-col text-center">
                  Do you have an ID ?
                  <Link to="/login" className="text-primary ml-3">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
