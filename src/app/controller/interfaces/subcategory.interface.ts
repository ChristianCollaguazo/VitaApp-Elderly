import { ImageSubcategory } from './image.interface';

export interface Subcategory {
  subcategoryId?: number;
  name: string;
  description: string;
  categoryId: number;
  imageUrl: string;
  color?: string;
  show?: boolean;
  images: ImageSubcategory[];
}

export interface SubcategoryCarer {
  subcategoryCarerId?: number;
  name: string;
  description: string;
  categoryId: number;
  subcategoryId: number;
  imageUrl: string;
  color?: string;
  show?: boolean;
}
