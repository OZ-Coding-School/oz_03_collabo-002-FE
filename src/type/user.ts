export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  profile_image?: string | null;
};

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateProfileImage: (imageUrl: string) => void;
}
