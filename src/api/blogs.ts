import { strapiFetch } from './client';
import type {
  StrapiBlog,
  StrapiCollectionResponse,
  StrapiSingleResponse,
} from '../types/strapi';

export function getBlogPosts(): Promise<StrapiCollectionResponse<StrapiBlog>> {
  return strapiFetch<StrapiCollectionResponse<StrapiBlog>>(
    '/api/blogs?populate=cover_image',
  );
}

export function getBlogPost(
  documentId: string,
): Promise<StrapiSingleResponse<StrapiBlog>> {
  return strapiFetch<StrapiSingleResponse<StrapiBlog>>(
    `/api/blogs/${documentId}?populate=cover_image`,
  );
}
