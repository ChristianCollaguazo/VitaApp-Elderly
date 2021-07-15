export interface Elderly {
  elderlyId?: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  laterality: string;
  gender: string;
  carerId: number;
  scholarityId: number;
}

export interface ElderlyCategory {
  elderlyId: number;
  categoryId: number;
}
