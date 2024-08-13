import React from 'react';
import facebook from '../icon/facebook.svg';
import kakao from '../icon/kakao.svg';
import google from '../icon/google.svg';
import naver from '../icon/naver.svg';
import signup_profile from '../icon/signup_profile.svg';
import { Link } from 'react-router-dom';
import Modal from '../components/common/Modal';
import { useModalStore } from '../store/useModal';

const SignUp = () => {
  const { modalMessage, setModal, clearModal, showModal } = useModalStore();
  const handleChange = () => {
    setModal('Successful Membership Registration');
  };
  return (
    <>
      {showModal && <Modal />}
      <form>
        <div className="flex flex-col max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-gray-100">
          <div className=" border-gray-200 border-2 rounded-2xl bg-white mt-8 mx-8 py-16">
            <div className="mb-8 text-center ">
              <h2 className="text-2xl font-bold  ">Sign Up</h2>
            </div>
            <div className="flex flex-col mx-4">
              {/* <label className="mb-3">소셜 로그인</label> */}

              <button className="bg-[#FEE500] text-black w-full rounded-xl h-10 mb-3">
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
                  Login with Naver
                </div>
              </button>
              <button className="bg-[#1877F2] text-white w-full rounded-xl h-10 mb-3 ">
                <div className="flex justify-center">
                  <img src={facebook} alt="페이스북" className="mr-4" />
                  Login with FaceBook
                </div>
              </button>
              <button className="bg-white text-black w-full rounded-xl h-10 mb-3">
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
                    name="email"
                    placeholder="Please enter your email"
                    required
                    className="border mt-1 block w-full rounded-xl text-sm border-gray-300 h-10 pl-3 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-gray-700"
                  >
                    PASSWORD
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Please enter your password"
                    required
                    className="border mt-1 block w-full rounded-xl text-sm border-gray-300 h-10 pl-3 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-gray-700"
                  >
                    NAME
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Please enter your name"
                    required
                    className="border mt-1 block w-full rounded-xl text-sm border-gray-300 h-10 pl-3 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="text-xs mb-3">
                  <div className="flex felx-col mb-1">
                    <input
                      type="radio"
                      id="agree"
                      name="agree"
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
                      id="agree"
                      name="agree"
                      className="mr-2"
                    />
                    <p>
                      They are over 14 years old{' '}
                      <span className="text-primary">(required)</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleChange}
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
