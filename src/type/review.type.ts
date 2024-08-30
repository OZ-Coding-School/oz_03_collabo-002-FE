export type Review = {
  class_id: string;
  id: number;
  review_text: string;
  rating: number;
  created_at: string;
  likes_count: number;
  user: {
    id: string;
    name: string;
    profile_url: string;
  };
  images:
    | {
        image_url: string;
      }[]
    | [];
};

export type ReviewState = {
  reviews: Review[] | null;
  myReviews: Review[] | null;
};

export type ReviewAction = {
  getReviews: (classId: string | undefined) => Promise<void>;
  getMyReviews: () => Promise<void>;
};
