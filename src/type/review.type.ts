export type Review = {
  class_id: string | number;
  id: string | number;
  review: string;
  rating: number;
  created_at: string;
  updated_at: string;
  likes_count: number;
  user: {
    id: string;
    email: string;
    name: string;
    profile_image_url: string;
  };
  images: [
    {
      id: 2;
      image_url: 'https://kr.object.ncloudstorage.com/customk-imagebucket/reply-images/28d866a7-1d7b-4fac-aa5d-1d6ae81db4e8.png';
    },
    {
      id: 3;
      image_url: 'https://kr.object.ncloudstorage.com/customk-imagebucket/reply-images/fc4e6b4b-ff2c-4311-9702-07429be34911.png';
    },
    {
      id: 4;
      image_url: 'https://kr.object.ncloudstorage.com/customk-imagebucket/reply-images/070d9976-0c6e-4505-bf57-2e146a88d32f.png';
    },
    {
      id: 5;
      image_url: 'https://kr.object.ncloudstorage.com/customk-imagebucket/reply-images/c48a37bc-7c08-4ea0-8091-b6eb342d1af6.png';
    },
  ];
};

export type ReviewState = {
  reviews: Review[] | null;
  myReviews: Review[] | null;
};

export type ReviewAction = {
  getReviews: (classId: string | undefined) => Promise<void>;
  getMyReviews: () => Promise<void>;
};
