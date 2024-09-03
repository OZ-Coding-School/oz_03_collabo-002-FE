// export type User = {
//   id: string;
//   email: string;
//   password: string;
//   name: string;
//   profile_image?: string | null;
// };

export type User = {
  id: string;
  email: string;
  // password: string;
  name: string;
  profile_image?: string | null;
};

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateProfileImage: (imageUrl: string) => void;
}
