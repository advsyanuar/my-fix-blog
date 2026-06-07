import { strapiFetch } from './client';
import type {
  StrapiProject,
  StrapiCollectionResponse,
  StrapiSingleResponse,
} from '../types/strapi';

export function getBlogPosts(): Promise<StrapiCollectionResponse<StrapiProject>> {
  return strapiFetch<StrapiCollectionResponse<StrapiProject>>(
    '/api/posts?populate=cover_image',
  );
}

export function getBlogPost(
  documentId: string,
): Promise<StrapiSingleResponse<StrapiProject>> {
  return strapiFetch<StrapiSingleResponse<StrapiProject>>(
    `/api/posts/${documentId}?populate=cover_image`,
  );
}
