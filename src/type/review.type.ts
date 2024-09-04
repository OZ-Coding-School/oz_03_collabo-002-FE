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
  class_id: number;
  id: number;
  review: string;
  rating: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  user: {
    email: string;
    name: string;
    profile_image_url: string;
  };
  images:
    | {
        image_url: string;
      }[]
    | [];
};

export type AllReview = {
  total_count: number;
  total_pages: number;
  current_page: number;
  reviews: {
    review: Review;
  }[];
};

export type ReviewState = {
  reviews: Review[] | null;
  // reviews: { review: Review }[] | null;
  myReviews: Review[] | null;
};

export type ReviewAction = {
  getReviews: (classId: number | undefined) => Promise<void>;
  getMyReviews: () => Promise<void>;
};
