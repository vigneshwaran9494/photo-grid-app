import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Photo, PhotosListData } from '../types/photos-list-data';

/**
 * Base query for the photos API
 */
export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_UNSPLASH_API_URL, // Use the environment variable
    // Prepare the headers for the API requests 'Authorization' is the token
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Client-ID ${process.env.EXPO_PUBLIC_UNSPLASH_API_KEY}`);
        return headers;
    },
})

// Create the API service for the photos API
export const photosApi = createApi({
  reducerPath: 'photos_api',
  baseQuery,
  endpoints: (builder) => ({
    // Get photos with pagination support
    getPhotos: builder.query<PhotosListData, { page: number, perPage: number }>({
      query: ({ page, perPage }: { page: number, perPage: number }) => ({
        url: API_ENDPOINTS.PHOTOS,
        method: 'GET',
        params: { page, perPage },
      }),
      transformResponse: (response: Photo[]): PhotosListData => {
        return {
          photos: Array.isArray(response) ? response : [],
        };
      },
      // Serialize query args to group by perPage only (ignore page for cache key)
      // This allows all pages to be merged into the same cache entry
      serializeQueryArgs: ({ queryArgs }) => {
        const { perPage } = queryArgs;
        return `getPhotos(${perPage})`;
      },
      // Merge function to accumulate photos from different pages
      merge: (currentCache, newItems, { arg }) => {
        // Initialize with empty array if cache is undefined
        const currentPhotos = currentCache?.photos || [];
        const newPhotos = newItems?.photos || [];
        
        if (arg.page === 1) {
          // First page - replace cache with new data
          return {
            photos: newPhotos,
          };
        }
        // Subsequent pages - merge new photos with existing cache
        const existingIds = new Set(currentPhotos.map((p: Photo) => p.id));
        const uniqueNewPhotos = newPhotos.filter((p: Photo) => !existingIds.has(p.id));
        return {
          photos: [...currentPhotos, ...uniqueNewPhotos],
        };
      },
      // Force refetch when page changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    // Get photo by id
    getPhotoById: builder.query<Photo, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `${API_ENDPOINTS.PHOTOS}/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: Photo) => response,
    }),
  }),
});

// Export hooks for the photos API
export const { useGetPhotosQuery, useGetPhotoByIdQuery } = photosApi;
