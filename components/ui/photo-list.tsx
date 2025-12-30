import { PhotoItem } from '@/components/ui/photo-item';
import { useGetPhotosQuery } from '@/data/api/photos-api';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const PER_PAGE = 20;

export function PhotoList() {
  const [page, setPage] = useState(1);
  const fetchingRef = useRef(false);

  const { data, isLoading, error, isFetching } = useGetPhotosQuery(
    { page, perPage: PER_PAGE },
    { skip: false }
  );

  // Determine if there are more photos to load
  const photos = data?.photos || [];
  const hasMore = photos.length >= PER_PAGE;

  // Reset fetching ref when fetch completes
  useEffect(() => {
    if (!isFetching && fetchingRef.current) {
      fetchingRef.current = false;
    }
  }, [isFetching]);

  const fetchMoreImages = useCallback(() => {
    if (fetchingRef.current || !hasMore || isFetching || isLoading) {
      return;
    }

    fetchingRef.current = true;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, isFetching, isLoading]);

  const handleEndReached = useCallback(() => {
    if (hasMore && !isFetching && !isLoading && !fetchingRef.current) {
      fetchMoreImages();
    }
  }, [hasMore, isFetching, isLoading, fetchMoreImages]);

  const loading = isLoading && page === 1;
  const loadingMore = isFetching && page > 1;

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#999" />
          <Text style={styles.emptyText}>Loading photos...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>Error loading photos</Text>
          <Text style={styles.errorSubtext}>
            {'status' in error ? `Error: ${error.status}` : 'Failed to load photos'}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No photos available</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={photos}
        numColumns={2}
        masonry={true}
        renderItem={({ item: photo }) => <PhotoItem photo={photo} />}
        keyExtractor={(photo) => photo.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        drawDistance={500}
      />
    </View>
  );
}

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
    color: '#999',
  },
  errorText: {
    fontSize: 18,
    color: '#ff4444',
    fontWeight: '600',
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
  },
});