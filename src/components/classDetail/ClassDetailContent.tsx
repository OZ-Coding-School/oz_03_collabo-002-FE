import { twJoin as tw } from 'tailwind-merge';
import { Class } from '../../type/class.type';
import { useEffect, useRef, useState } from 'react';
import { IconMapShare, IconMoreArw } from '../../config/IconData';
import ClassDetailReview from './ClassDetailReview';
import useReviewStore from '../../store/useReviewStore';
import ClassDetailPolicy from './ClassDetailPolicy';

type ClassDetailContentProps = {
  classData: Class;
  scrollToSection: (sectionRef: React.RefObject<HTMLDivElement>) => void;
  reviewsRef: React.RefObject<HTMLDivElement>;
};

const ClassDetailContent = ({
  classData,
  scrollToSection,
  reviewsRef,
}: ClassDetailContentProps) => {
  const detailsRef = useRef<HTMLDivElement>(null);
  const resPoliciesRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false); // expanded 상태 추가
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleImageSize = () => {
    if (!expanded && buttonRef.current) {
      const { top } = buttonRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top,
        behavior: 'smooth',
      });
    }
    setExpanded(!expanded);
  };

  const handleCopy = () => {
    if (typeof classData?.address === 'string') {
      navigator.clipboard
        .writeText(classData.address)
        .then(() => {
          alert('Address copied to clipboard.');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  // 리뷰 관련 state
  const reviews = useReviewStore((state) => state.reviews);
  const getReviews = useReviewStore((state) => state.getReviews);

  useEffect(() => {
    getReviews(Number(classData.id));
  }, [getReviews, classData]);

  return (
    <>
      {/* -- Main Section -- */}
      {/* detail title */}
      <div className="mt-20 sticky top-[57px] bg-white z-20">
        <ul
          className={tw(
            'flex items-center w-full justify-around mt-[30px] py-3',
            'border-t border-t-1 border-black border-b border-b-1 border-b-gray-300',
          )}
        >
          <li className="flex-1">
            <button
              onClick={() => scrollToSection(detailsRef)}
              className="flex items-center justify-center w-full h-full"
            >
              Details
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => scrollToSection(reviewsRef)}
              className="flex items-center justify-center w-full h-full"
            >
              Review({reviews?.length})
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => scrollToSection(resPoliciesRef)}
              className="flex items-center justify-center w-full h-full"
            >
              Res. & Policies
            </button>
          </li>
        </ul>
      </div>
      {/* Detail */}
      <div ref={detailsRef} className="mb-10">
        <div
          className={`w-full overflow-hidden ${expanded ? '' : 'max-h-[500px]'}`}
          style={{ maxHeight: expanded ? 'none' : '500px' }}
        >
          {classData?.images?.[0]?.detail_image_urls?.length ? (
            classData.images[0].detail_image_urls.map((url: string) => (
              <img
                src={url}
                alt={url}
                key={url}
                className="w-full object-contain"
              />
            ))
          ) : (
            <p className="text-center py-5">No detailed images available.</p>
          )}
        </div>

        <button
          type="button"
          className="border border-primary z-10 relative text-primary rounded-3xl w-full py-4 mt-4 flex justify-center"
          onClick={toggleImageSize}
        >
          More Details
          <IconMoreArw className={`${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {/* location */}
      <div className="mt-10 pt-10 border-t border-t-1 border-t-gray-300">
        <h3 className="text-[20px] px-6 font-semibold">Location</h3>
        <div className="px-6 py-7 text-[14px] relative">
          <p>
            <strong>We Open Class Here</strong>
          </p>
          <p className="text-gray-500">{classData.address}</p>
          <button
            type="button"
            className="absolute right-6 top-6 border border-gray-300 rounded-full p-3"
          >
            <IconMapShare onClick={handleCopy} />
          </button>
        </div>
      </div>
      {/* Review */}
      <div ref={reviewsRef}>
        <ClassDetailReview reviews={reviews} id={classData.id} />
      </div>
      {/* Res. Policy */}
      <div ref={resPoliciesRef}>
        <ClassDetailPolicy />
      </div>
    </>
  );
};

export default ClassDetailContent;
