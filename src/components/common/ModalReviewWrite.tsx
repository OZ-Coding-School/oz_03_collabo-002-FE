import { useCallback, useEffect, useRef, useState } from 'react';
import arrowLeft from '../../assets/icon/icon-arrow-left.svg';
import emptyStar from '../../assets/icon/empty-star.svg';
import fullStar from '../../assets/icon/full-star.svg';
import remove from '../../assets/icon/icon-remove.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Review } from '../../type/review.type';
import { useModalStore } from '../../store/useModal';
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

const ModalReviewWrite = () => {
  const stars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [uploadImgs, setUploadImgs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputCount, setInputCount] = useState<number>(0);
  const { setModal, showModal } = useModalStore();
  const { class_id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Review>({
    defaultValues: {
      review_text: '',
      created_at: '',
      rating: 0,
      images: [
        // {
        //   image_url: '',
        // },
      ],
    },
  });
  const reviewText = watch('review_text');

  const clearValue = () => {
    reset({
      review_text: '',
      created_at: '',
      rating: 0,
      images: [
        // {
        //   image_url: '',
        // },
      ],
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
    setRating((prevRating) =>
      selectedRating === prevRating ? prevRating - 1 : selectedRating,
    );
  };

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
  // console.log('uploadImg: ', uploadImg);

  const handleDelete = (indexDelete: number) => {
    console.log(indexDelete);
    const filterImg = uploadImgs.filter((_, index) => index !== indexDelete);
    setUploadImgs(filterImg);
  };

  const onsubmit: SubmitHandler<Review> = async (data) => {
    try {
      const { review_text, images, rating } = data;
      const currentDate = new Date().toISOString();
      const reviewData = {
        images: uploadImgs.map((img) => ({ image_url: img })),
        class_id: class_id,
        created_at: currentDate,
        review_text,
        rating,
      };
      console.log(review_text, images, rating);
      await axios.post(
        `reviews/${class_id}`,
        // `https://api.custom-k.store/v1/reviews/1`,
        {
          reviewData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setModal('Successful Save');
      clearValue();
      setRating(0);
      setUploadImgs([]);
    } catch (error) {
      console.error('Error submitting review:', error);

      setModal('Please fill out all the requirements.');
    }
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
                      {...register('images', {})}
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
                  {...register('review_text', {
                    required: 'Review text is required',
                    minLength: {
                      value: 20,
                      message: 'Review must be at least 20 characters long',
                    },
                  })}
                ></textarea>
                {errors.review_text && <p>{errors.review_text.message}</p>}
                <hr className="border-b-gray-300" />
                <div className="flex justify-center mt-1 gap-2">
                  {stars.map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStar(star)}
                    >
                      <img
                        src={star <= rating ? fullStar : emptyStar}
                        alt={`${star} 점`}
                        id="rating"
                        {...(register('rating'),
                        {
                          required: 'This is a mandoatory item.',
                        })}
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
