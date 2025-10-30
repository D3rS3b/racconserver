export interface News {
  id: string;
  title: string;
  content: string;
  summary: string;
  image?: string; // base64 string
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsFormData {
  title: string;
  content: string;
  summary: string;
  author: string;
  image?: File | string;
}

export interface NewsFilters {
  search?: string;
  author?: string;
}