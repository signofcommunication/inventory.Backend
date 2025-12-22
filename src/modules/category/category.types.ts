export interface CreateCategoryDTO {
  name: string;
  description?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
