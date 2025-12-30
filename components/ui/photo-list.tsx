import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ErrorState } from '@/components/ui/error-state';
import { PhotoItem } from '@/components/ui/photo-item';
import { Colors } from '@/constants/theme';
import { useGetPhotosQuery } from '@/data/api/photos-api';
import { Photo } from '@/data/types/photos-list-data';
import { FlashList } from '@shopify/flash-list';
import { memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const IMAGES_PER_PAGE = 10;

/**
 * Footer component for the photo list
 */
const ListFooter = memo(({ loadingMore }: { loadingMore: boolean }): ReactNode => {
  if (!loadingMore) return null;
  return (
    <ThemedView style={styles.footer}>
      <ActivityIndicator size="small" color={Colors.light.text} />
    </ThemedView>
  );
});
ListFooter.displayName = 'ListFooter';

/**
 * Empty state component for the photo list
 */
const ListEmpty = memo(({ loading, error }: { loading: boolean; error: unknown }) => (
  <ThemedView style={styles.emptyContainer}>
    {loading && (
      <>
        <ActivityIndicator size="large" color={Colors.light.text} />
        <ThemedText type="default" style={styles.emptyText}>Loading photos...</ThemedText>
      </>
    )}
    {!!error && <ErrorState error={error} message="Error loading photos" />}
    {!loading && !error && (
      <ThemedText type="default" style={styles.emptyText}>No photos available</ThemedText>
    )}
  </ThemedView>
));
ListEmpty.displayName = 'ListEmpty';

function PhotoListComponent() {
  // State for the page number
  const [page, setPage] = useState(1);
  const fetchingRef = useRef(false);

  // Get the photos from the API
  // Prevent unnecessary refetches when navigating away/back
  const { data, isLoading, error, isFetching } = useGetPhotosQuery(
    { page, perPage: IMAGES_PER_PAGE },
    { 
      skip: false,
      refetchOnMountOrArgChange: false, // Don't refetch on mount if data exists
      refetchOnFocus: false, // Don't refetch when screen comes into focus
      refetchOnReconnect: false, // Don't refetch on reconnect
    }
  );

  // Determine if there are more photos to load
  const photos = useMemo(() => data?.photos || [], [data?.photos]);
  const hasMore = useMemo(() => photos.length >= IMAGES_PER_PAGE, [photos.length]);

  // Reset fetching ref when fetch completes
  useEffect(() => {
    if (!isFetching && fetchingRef.current) {
      fetchingRef.current = false;
    }
  }, [isFetching]);

  /**
   * Fetch more images when the user scrolls to the bottom of the list
   * @returns void
   */
  const fetchMoreImages = useCallback(() => {
    if (fetchingRef.current || !hasMore || isFetching || isLoading) {
      return;
    }

    fetchingRef.current = true;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, isFetching, isLoading]);

  /**
   * Handle the end of the list
   * @returns void
   */
  const handleEndReached = useCallback(() => {
    if (hasMore && !isFetching && !isLoading && !fetchingRef.current) {
      fetchMoreImages();
    }
  }, [hasMore, isFetching, isLoading, fetchMoreImages]);

  const loading = isLoading && page === 1;
  const loadingMore = isFetching && page > 1;


  /**
   * Extract key from photo item
   */
  const keyExtractor = useCallback((photo: Photo) => photo.id, []);

  /**
   * Render the list of photos
   */
  return (
    <ThemedView style={styles.container}>
      <FlashList
        data={photos}
        numColumns={2}
        masonry={true}
        renderItem={ ({ item: photo }) => <PhotoItem photo={photo} />}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => <ListFooter loadingMore={loadingMore} />}
        ListEmptyComponent={() => <ListEmpty loading={loading} error={error} />}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        drawDistance={500}
      />
    </ThemedView>
  );
}

/**
 * Styles for the photo list
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 4,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export const PhotoList = memo(PhotoListComponent);