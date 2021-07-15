import { ImageCategory } from './image.interface';

export interface Category {
  categoryId?: number;
  name: string;
  description: string;
  colorId: number;
  color?: string;
  imageUrl: string;
  show?: boolean;
  images: ImageCategory[];
}

export interface CategoryCarer {
  categoryCarerId?: number;
  helperId?: number;
  name: string;
  description: string;
  color: string;
  imageUrl: string;
  categoryId: number;
  carerId: number;
}
