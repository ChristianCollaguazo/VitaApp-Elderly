export interface ImageCategory {
  imageId?: number;
  name: string;
  imageUrl: string;
  categoryId?: number;
}

export interface ImageSubcategory {
  imageId?: number;
  name: string;
  imageUrl: string;
  subcategoryId?: number;
}

export interface ImagePictogram {
  imageId?: number;
  name: string;
  imageUrl: string;
  pictogramId?: number;
}

export interface ImagePictogramHelp {
  imageId?: number;
  name: string;
  imageUrl: string;
  pictogramId?: number;
}

export interface FileUploadResponse {
  name: string;
  imageUrl: string;
}
