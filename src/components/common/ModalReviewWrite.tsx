import { useCallback, useRef, useState } from 'react';
// import arrowLeft from '../../icon/icon-arrow-left.svg';
import arrowLeft from '../../assets/icon/icon-arrow-left.svg';
import emptyStar from '../../assets/icon/empty-star.svg';
import fullStar from '../../assets/icon/full-star.svg';

const ModalReviewWrite = () => {
  const stars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [uploadImg, setUploadImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStar = (selectedRating: number) => {
    setRating((prevRating) =>
      selectedRating === prevRating ? prevRating - 1 : selectedRating,
    );
  };

  const handleInputImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadImg(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  console.log('uploadImg: ', uploadImg);

  return (
    <form>
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
            <div className="mt-4">
              <button
                className="w-32 h-32 border border-black rounded-xl bg-gray/20"
                onClick={handleUpload}
              >
                <span className="text-3xl">+</span>
                <br />
                <span className="text-sm"> Upload a picture</span>
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleInputImage}
              />
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="font-bold">Please leave a review</span>
              <span className="text-[10px] font-bold">
                0 characters / 20 characters minimum
              </span>
            </div>
            <div className="mt-4">
              <div className="border border-gray-800 rounded-lg h-[250px] w-full">
                <textarea
                  id="review"
                  name="review"
                  required
                  className="w-full h-[200px] p-3  rounded-xl resize-none text-xs"
                  placeholder={`What was the most memorable thing in your class experience?
Please honestly write down your pleasant memories, regretful memories, and things you felt during the experience.`}
                ></textarea>
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
