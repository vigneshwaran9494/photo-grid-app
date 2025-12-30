import { PhotoItem } from '@/components/ui/photo-item';
import { useFetchImages } from '@/hooks/use-fetch-images';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {

  const { photosListData, loading, error, fetchMoreImages } = useFetchImages(); 

  return (
    <View>
      <FlashList
        data={photosListData.photos}
        numColumns={2}
        masonry={true}
        renderItem={({ item : photo }) => <PhotoItem photo={photo} />}
        keyExtractor={(photo) => photo.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
