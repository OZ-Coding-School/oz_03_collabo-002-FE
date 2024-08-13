import React from 'react';
import facebook from '../icon/facebook.svg';
import kakao from '../icon/kakao.svg';
import google from '../icon/google.svg';
import naver from '../icon/naver.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <form>
      <div className="flex flex-col max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-gray-100">
        <div className=" border-gray-200 border-2 rounded-2xl bg-white mt-32 mx-8 py-20">
          <div className="mb-8 text-center ">
            <h2 className="text-2xl font-bold ">LOGIN</h2>
            <p className="text-gray-400">
              If you log in, you can apply for different classes!
            </p>
          </div>
          <div className="flex flex-col mx-4">
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
              <button className="bg-primary text-white w-full rounded-xl h-10">
                LOGIN
              </button>
            </div>

            <div className="flex flex-col">
              {/* <label className="mb-3">소셜 로그인</label> */}
              <hr className="border-b-1 mb-6" />
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
            <div className="mt-4 flex flex-col text-center">
              Do you need to sign up for membership ?
              <Link to="/signup" className="text-primary ml-3">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
