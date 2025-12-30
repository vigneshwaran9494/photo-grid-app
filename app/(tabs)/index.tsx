import { ThemedView } from '@/components/themed-view';
import { PhotoList } from '@/components/ui/photo-list';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <PhotoList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
