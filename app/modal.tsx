import { ThemedText } from '@/components/themed-text';
import { ErrorState } from '@/components/ui/error-state';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ProgressiveImage } from '@/components/ui/progressive-image';
import { Colors } from '@/constants/theme';
import { useGetPhotoByIdQuery } from '@/data/api/photos-api';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, Dimensions, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ModalScreen() {
  const { photoId } = useLocalSearchParams<{ photoId: string }>();

  const { data: photo, isLoading, error } = useGetPhotoByIdQuery({ id: photoId }, { skip: !photoId , refetchOnMountOrArgChange: true });
 
  const handleClose = () => {
    router.back();
  };
  
  if (isLoading) {
    return (
      <View style={[styles.container,styles.centerContainer]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container,styles.centerContainer]}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
        <IconSymbol size={28} name="house.fill" color={Colors.light.text} />
        </Pressable>
        <ErrorState error={error} message="Photo not found" textStyle={styles.errorText} />
      </View>
    );
  }

  if (!photo) {
    return (
      <View style={[styles.container,styles.centerContainer]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const aspectRatio = useMemo(() => photo.height / photo.width, [photo.height, photo.width]);
  const imageHeight = useMemo(() => Math.min(SCREEN_HEIGHT, SCREEN_WIDTH * aspectRatio), [SCREEN_HEIGHT, SCREEN_WIDTH, aspectRatio]);

  // Prepare URLs array: regular first, then full for progressive loading
  const imageUrls = useMemo(() => [
    photo.urls.regular,
    photo.urls.full,
  ], [photo.urls.regular, photo.urls.full]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Pressable onPress={handleClose} style={styles.closeButton}>
        <ThemedText style={styles.closeButtonText}>✕</ThemedText>
      </Pressable>
      <View style={styles.imageContainer}>
        <ProgressiveImage
          blurHash={photo.blur_hash}
          urls={imageUrls}
          mode="modal"
          contentFit="contain"
          style={[styles.image, { height: imageHeight }]}
          transition={200}
        />
      </View>
      {(photo.description || photo.alt_description) && (
        <View style={styles.infoContainer}>
          <ThemedText numberOfLines={2} style={styles.description}>
            {photo.description || photo.alt_description}
          </ThemedText>
          {photo.user && (
            <Text style={styles.author}>
              Photo by {photo.user.name || photo.user.username}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    paddingBottom: 40,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  author: {
    color: '#ccc',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});
