import { strapiFetch } from './client';
import type {
  StrapiProject,
  StrapiCollectionResponse,
  StrapiSingleResponse,
} from '../types/strapi';

export function getProjects(): Promise<StrapiCollectionResponse<StrapiProject>> {
  return strapiFetch<StrapiCollectionResponse<StrapiProject>>(
    '/api/projects?populate=cover_image',
  );
}

export function getProject(
  documentId: string,
): Promise<StrapiSingleResponse<StrapiProject>> {
  return strapiFetch<StrapiSingleResponse<StrapiProject>>(
    `/api/projects/${documentId}?populate=cover_image`,
  );
}
