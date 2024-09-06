import facebook from '../assets/icon/facebook.svg';
import kakao from '../assets/icon/kakao.svg';
import google from '../assets/icon/google.svg';
import line from '../assets/icon/line.svg';
import signup_profile from '../assets/icon/signup_profile.svg';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/common/Modal';
import { useModalStore } from '../store/useModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Signup } from '../type/signup';
import { handleKaKao } from '../components/Login/Kakao';
import { handleGoogle } from '../components/Login/Google';
// import axios from 'axios';
import axios from '../api/axios';
import { useCallback, useMemo, useRef, useState } from 'react';
import ModalProfile from '../components/common/ModalProfile';

const SignUp = () => {
  const { setModal, showModal } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalFileName, setOriginalFileName] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [imgFile, setImgFile] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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
      agree1: false,
      agree2: false,
    },
  });
  const clearValue = useCallback(() => {
    reset({
      name: '',
      email: '',
      password: '',
      agree1: false,
      agree2: false,
    });
    setImg('');
  }, [reset]);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setOriginalFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setIsModalOpen(true);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handleCroppedImage = useCallback(
    (imageFile: File) => {
      setImgFile(imageFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        // setCroppedImage(reader.result as string);
        setImg(reader.result as string);
      };
      console.log('img as string: ', img);
      reader.readAsDataURL(imageFile);
      setIsModalOpen(false);
    },
    [img],
  );

  // const handleFileSelect = (file: File) => {
  //   const imageUrl = URL.createObjectURL(file);
  //   setImgFile(file);
  //   setImg(imageUrl);
  // };
  const handleChange = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  }, []);
  const onSubmit: SubmitHandler<Signup> = useCallback(
    async (data) => {
      try {
        const { name, email, password } = data;
        console.log('1');
        console.log('imgFile:', imgFile);
        let signData;
        if (img === '') {
          signData = {
            name: name,
            email: email,
            password: password,
          };
        } else {
          signData = {
            name: name,
            email: email,
            password: password,
            profile_image: img,
          };
        }

        await axios.post(
          // `${import.meta.env.VITE_CALLBACK_URL}signup/`,
          `/users/signup/`,
          signData,
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
        console.log({ name, email, password });
        clearValue();
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Error during signup:', error);
        // if (axios.isAxiosError(error)) {
        //   if (error.response) {
        //     console.error('Response data:', error.response.data);
        //     console.error('Response status:', error.response.status);
        //   } else if (error.request) {
        //     console.error('No response received:', error.request);
        //   } else {
        //     console.error('Error setting up request:', error.message);
        //   }
        // } else {
        //   console.error('Unexpected error:', error);
        // }
        setModal('Signup failed. Please try again.');
      }
    },
    [img, imgFile, navigate, setModal, clearValue],
  );

  const memoizedModalProfile = useMemo(
    () =>
      isModalOpen &&
      preview && (
        <ModalProfile
          preview={preview}
          onClose={() => setIsModalOpen(false)}
          onCrop={handleCroppedImage}
          originalFileName={originalFileName}
        />
      ),
    [isModalOpen, preview, handleCroppedImage, originalFileName],
  );

  return (
    <>
      {showModal && <Modal />}
      {memoizedModalProfile}
      <div className="flex flex-col max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-gray-100">
        <div className=" border-gray-200 border-2 rounded-2xl bg-white mt-8 mx-8 py-16">
          <div className="mb-8 text-center ">
            <h2 className="text-2xl font-bold  ">Sign Up</h2>
          </div>
          <div className="flex flex-col mx-4">
            <button
              className="bg-[#FEE500] text-black w-full rounded-xl h-10 mb-3"
              onClick={handleKaKao}
            >
              <div className="flex justify-center">
                {<img src={kakao} alt="kakao" className="mr-4 mt-0.5" />}
                Login with Kakao
              </div>
            </button>
            <button className="bg-[#03C75A] text-white w-full rounded-xl h-10 mb-3">
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
          <hr className="border-b-1 mb-6 mx-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mx-4">
              <div className="mb-7">
                <div>
                  <div className="block text-xs font-bold text-gray-700 mb-4">
                    Sign up for membership by e-mail
                  </div>
                  <div className="flex justify-center relative mb-3">
                    {img === '' ? (
                      <img
                        src={signup_profile}
                        alt="프로필 기본 이미지"
                        className="rounded-full text-3xl overflow-visible "
                        id="profile_default"
                      />
                    ) : (
                      <img
                        src={img}
                        alt="프로필이미지"
                        className="rounded-full w-[59px] h-[59px]"
                        id="profile_image"
                        {...register('profile_image', {})}
                      />
                    )}

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    <button
                      onClick={handleChange}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[59px] h-[59px] flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-200 hover:opacity-50"
                    >
                      Profile Edit
                    </button>
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
                    <p className="text-red px-2 text-xs">
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
                    <p className="text-red px-2 text-xs">
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
                    <p className=" text-red px-2 text-xs">
                      * Name can only contain English letters and numbers.
                    </p>
                  )}
                </div>
                <div className="text-xs mb-3">
                  <div className="flex felx-col mb-1">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        id="agree1"
                        className="mr-2"
                        {...register('agree1', {
                          required:
                            '* You must agree to the terms and conditions.',
                        })}
                      />
                      <span>
                        I agree to the terms and conditions{' '}
                        <span className="text-primary">(required)</span>
                      </span>
                    </label>
                  </div>
                  {errors.agree1 && (
                    <p className="text-red px-2 text-xs">
                      {errors.agree1.message}
                    </p>
                  )}
                  <div className="flex felx-col">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        id="agree2"
                        className="mr-2"
                        required
                        {...register('agree2', {
                          required:
                            '* You must confirm that you are over 14 years old.',
                        })}
                      />
                      <span>
                        They are over 14 years old{' '}
                        <span className="text-primary">(required)</span>
                      </span>
                    </label>
                  </div>
                  {errors.agree2 && (
                    <p className=" text-red px-2 text-xs">
                      {errors.agree2.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white w-full rounded-xl h-10 mt-2"
                >
                  Sign Up
                </button>
                <div className="mt-4 flex flex-col text-center text-sm">
                  Do you have an ID ?
                  <Link to="/login" className="text-primary ml-3">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
