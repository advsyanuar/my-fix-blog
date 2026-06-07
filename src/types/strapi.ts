export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  description: string;
  category: string;
  date_start: string;
  date_end: string | null;
  is_ongoing: boolean;
  language: string;
  content: string;
  cover_image?: StrapiMedia | null;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
}
