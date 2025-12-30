
import { useGetPhotoByIdQuery } from '@/data/api/photos-api';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Photo not found</Text>
        </View>
      </View>
    );
  }

  const aspectRatio = photo.height / photo.width;
  const imageHeight = Math.min(SCREEN_HEIGHT, SCREEN_WIDTH * aspectRatio);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Pressable onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✕</Text>
      </Pressable>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: photo.urls.full }}
          placeholder={{ blurhash: photo.blur_hash }}
          contentFit="contain"
          style={[styles.image, { height: imageHeight }]}
          transition={200}
        />
      </View>
      {(photo.description || photo.alt_description) && (
        <View style={styles.infoContainer}>
          <Text style={styles.description}>
            {photo.description || photo.alt_description}
          </Text>
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
