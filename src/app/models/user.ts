import { Image } from './image';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: number;
  image: Image;
}
