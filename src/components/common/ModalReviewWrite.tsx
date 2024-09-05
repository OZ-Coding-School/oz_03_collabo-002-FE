import { useCallback, useEffect, useRef, useState } from 'react';
import arrowLeft from '../../assets/icon/icon-arrow-left.svg';
import emptyStar from '../../assets/icon/empty-star.svg';
import fullStar from '../../assets/icon/full-star.svg';
import remove from '../../assets/icon/icon-remove.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Review } from '../../type/review.type';
import { useModalStore } from '../../store/useModal';
import Modal from './Modal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useUserStore } from '../../store/useUser';

const ModalReviewWrite = () => {
  const stars = [1, 2, 3, 4, 5];
  const [ratings, setRatings] = useState(0);
  const [uploadImgs, setUploadImgs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputCount, setInputCount] = useState<number>(0);
  const { setModal, showModal } = useModalStore();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [accessToken, setAccessToken] = useState<string | null>('');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Review>({
    defaultValues: {
      review: '',
      created_at: '',
      rating: '0',
      images: [],
    },
  });
  const reviewText = watch('review');

  const clearValue = () => {
    reset({
      review: '',
      created_at: '',
      rating: '0',
      images: [],
    });
  };

  useEffect(() => {
    console.log('uploadImgs: ', uploadImgs);
  }, [uploadImgs]);

  useEffect(() => {
    if (typeof reviewText === 'string') {
      setInputCount(reviewText.length);
    }
  }, [reviewText]);

  const handleStar = (selectedRating: number) => {
    setRatings((prevRating) =>
      selectedRating === prevRating ? prevRating - 1 : selectedRating,
    );
    console.log('seletedRating: ', selectedRating);
  };

  useEffect(() => {
    console.log('star: ', stars);
    console.log('ratings: ', ratings);
  }, [ratings]);

  useEffect(() => {
    console.log('id: ', id);
    console.log('user: ', user);
    if (user) {
      const Token = localStorage.getItem('accessToken');
      setAccessToken(Token);
      console.log('accessToken: ', Token);
    }
  }, []);

  const handleInputImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newImgs: string[] = [];
        Array.from(files).forEach((file, index) => {
          if (index < 4 - uploadImgs.length) {
            const reader = new FileReader();
            reader.onloadend = () => {
              newImgs.push(reader.result as string);
              setUploadImgs((prev) => [...prev, ...newImgs]);
            };
            reader.readAsDataURL(file);
          }
        });
      }
    },
    [uploadImgs],
  );

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (indexDelete: number) => {
    console.log(indexDelete);
    const filterImg = uploadImgs.filter((_, index) => index !== indexDelete);
    setUploadImgs(filterImg);
  };

  const onsubmit: SubmitHandler<Review> = async (data) => {
    try {
      // images, rating은 form data에서 추출해 낼 수 없음 -> <img /> 여서 그런가..
      // 그래서 form data로 review_text만 추출 가능
      const { review } = data;
      const currentDate = new Date().toISOString();
      const reviewData = {
        images:
          uploadImgs.length > 0
            ? uploadImgs.map((img) => ({ image_url: img }))
            : [],
        class_id: Number(id),
        created_at: currentDate,
        review,
        rating: ratings.toString(),
      };
      console.log(reviewData);
      await axios.post(
        `reviews/${id}`,

        reviewData,

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      setModal('Successful Save');
      clearValue();
      setRatings(0);
      setUploadImgs([]);
      setTimeout(() => {
        navigate(`class/${id}`);
      }, 2000);
    } catch (error) {
      console.error('Error submitting review:', error);

      setModal('Please fill out all the requirements.');
    }
  };

  const handleOut = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      {showModal && <Modal />}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
        <div className="border rounded-2xl w-[440px] h-[710px] bg-white flex flex-col  items-center">
          <div className="flex justify-between w-full mt-4">
            <img
              src={arrowLeft}
              alt="나가기"
              className="mx-6 w-4 stroke-[#666666]"
              onClick={handleOut}
            />
            <span className="w-full text-center mr-14 font-bold">Review</span>
          </div>
          <hr className="border-b-1 w-full mt-4" />
          <div className="mx-8 my-5">
            <div>
              <p className="text-base font-bold">Upload a Picture</p>
              <p className="text-xs text-gray">
                Please post a picture related to the memories you experienced in
                Custom-K! <br /> If you register a photo that is not related to
                or inappropriate for the product in the review, the photo may be
                deleted without prior warning.
              </p>
            </div>
            <div className="mt-4 flex">
              <div className="flex flex-col items-start">
                <button
                  className={`w-32 h-32 border border-black rounded-xl bg-gray/20 flex flex-col items-center justify-center mb-2
                    ${
                      uploadImgs.length >= 4
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  onClick={handleUpload}
                  disabled={uploadImgs.length >= 4}
                >
                  <span className="text-3xl">+</span>
                  <span className="text-sm">Upload a picture</span>
                  <span className="text-xs">( Up to 4 pages )</span>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleInputImage}
                />
              </div>
              {/* 원본 사진 유지 */}
              {/* <div className="ml-2 grid grid-cols-2 gap-2">
                {uploadImgs.map((img, index) => (
                  <div
                    key={index}
                    className="w-[60px] h-[60px] border border-black rounded-xl overflow-hidden flex justify-center"
                  >
                    <img
                      src={img}
                      alt={`Uploaded ${index + 1}`}
                      className=" h-full "
                    />
                  </div>
                ))}
                  
              </div> */}
              <div className="ml-2 grid grid-cols-2 gap-2">
                {uploadImgs.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-[60px] h-[60px] border border-black rounded-xl overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                      id="images"
                    />
                    <button
                      onClick={() => handleDelete(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-xl p-1 text-xs z-10"
                    >
                      <img
                        src={remove}
                        alt="delete"
                        className="h-[15px] w-[15px]"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="font-bold">Please leave a review</span>
              <span className="text-[10px] font-bold">
                <span className={`${inputCount < 20 ? 'text-red' : ''}`}>
                  {inputCount} characters{' '}
                </span>
                <span>/ 20 characters minimum</span>
              </span>
            </div>
            <div className="mt-4">
              <div className="border border-gray-800 rounded-lg h-[250px] w-full">
                <textarea
                  id="review_text"
                  required
                  className="w-full h-[200px] p-3  rounded-xl resize-none text-xs"
                  placeholder={`What was the most memorable thing in your class experience?
Please honestly write down your pleasant memories, regretful memories, and things you felt during the experience.`}
                  // onChange={handleInputChange}
                  minLength={20}
                  {...register('review', {
                    required: 'Review text is required',
                    minLength: {
                      value: 20,
                      message: 'Review must be at least 20 characters long',
                    },
                  })}
                ></textarea>
                {errors.review && <p>{errors.review.message}</p>}
                <hr className="border-b-gray-300" />
                <div className="flex justify-center mt-1 gap-2">
                  {stars.map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStar(star)}
                    >
                      <img
                        src={star <= ratings ? fullStar : emptyStar}
                        alt={`${star} 점`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="bg-primary w-full h-11 text-white font-bold rounded-lg my-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalReviewWrite;
