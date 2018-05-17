import { User } from './user';
import { Tag } from './tag';

export interface Update {
  id: number;
  user: User;
  tags: Tag[];
  content: string;
  userId: number;
  imageId: number;
  likes: number;
  commentsCount: number;
  createdAt: number;
  liked: boolean;
  favorited: boolean;
}
