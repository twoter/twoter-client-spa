import { User } from './user';

export interface Comment {
  id: number;
  content: string;
  updateId: string;
  userId: number;
  user: User;
  imageId: number;
  likes: number;
  createdAt: number;
  liked: boolean;
}
