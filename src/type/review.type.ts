// export type Review = {
//   class_id: string;
//   id: number;
//   review: string;
//   rating: number;
//   created_at: string;
//   updated_at: string;

//   user: {
//     id: string;
//   };
//   images:
//     | {
//         image_url: string;
//       }[]
//     | [];
// };

export type Review = {
  class_id: string | number;
  id: string | number;
  review: string;
  rating: number;
  created_at: string;
  updated_at: string;
  likes_count: number;
  user: {
    id: string | number;
    email: string;
    name: string;
    profile_image_url: string;
  };
  images: [
    {
      id: string | number;
      image_url: string;
    },
  ];
};

export type AllReview = {
  total_count: number;
  total_pages: number;
  current_page: number;
  reviews: {
    review: Review;
  }[];
};

// export type ReviewState = {
//   reviews: Review[] | null;
//   // reviews: { review: Review }[] | null;
//   myReviews: Review[] | null;
//   isUpdate: boolean;
//   isDelete: Review[] | null;
// };

// export type ReviewAction = {
//   getReviews: (classId: number | undefined) => Promise<void>;
//   getMyReviews: () => Promise<void>;
//   setIsUpdate: () => void;
//   setIsDelete: (
//     classId: number | undefined,
//     reviewId: number | undefined,
//   ) => Promise<void>;
// };

export type ReviewState = {
  reviews: Review[] | null;
  myReviews: Review[] | null;
  isUpdate: boolean;
  isDelete: null;
  hasMore: boolean;
};

export type ReviewAction = {
  getReviews: (
    classId: number | undefined,
    page?: number,
    size?: number,
  ) => Promise<Review[]>;
  getMyReviews: () => Promise<void>;
  setIsUpdate: () => void;
  setIsDelete: (
    classId: number | undefined,
    reviewId: number | undefined,
  ) => Promise<void>;
};
export type ClassTitle = [
  {
    id: string,
    title: string,
  }
]
