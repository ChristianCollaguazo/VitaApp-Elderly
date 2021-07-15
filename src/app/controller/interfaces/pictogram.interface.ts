import { ImagePictogram } from './image.interface';

export interface Pictogram {
  pictogramId?: number;
  name: string;
  imageUrl: string;
  subcategoryId: number;
  color?: string;
  images: ImagePictogram[];
}

export interface PictogramCarer {
  pictogramCarerId?: number;
  pictogramId?: number;
  position?: number;
  name: string;
  imageUrl: string;
  subcategoryId: number;
  color?: string;
}

export interface PictogramHelper {
  pictogramId?: number;
  name: string;
  imageUrl: string;
  color?: string;
}

export interface PictogramHelperCarer {
  pictogramCarerId?: number;
  pictogramId?: number;
  position?: number;
  name: string;
  imageUrl: string;
  helperId: number;
  color?: string;
}
