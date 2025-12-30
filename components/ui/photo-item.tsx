import { Photo } from "@/data/types/photos-list-data";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { memo, useCallback, useMemo } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PADDING = 4;
const GRID_GAP = 4;
const NUM_COLUMNS = 2;
const COLUMN_WIDTH = (SCREEN_WIDTH - (GRID_PADDING * 2) - GRID_GAP) / NUM_COLUMNS;

function PhotoItemComponent({ photo }: { photo: Photo }) {
    const router = useRouter();
    
    // Calculate the height of the image based on the aspect ratio
    const aspectRatio = useMemo(() => photo.height / photo.width, [photo.height, photo.width]);
    const imageHeight = useMemo(() => COLUMN_WIDTH * aspectRatio, [COLUMN_WIDTH, aspectRatio]);
    
    // Handle the press of the photo item
    const handlePress = useCallback(() => {
        router.push({
            pathname: '/modal',
            params: {
                photoId: photo.id,
            },
        });
    }, [photo.id, router]);

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Image 
                contentFit="cover" 
                placeholder={{ blurhash: photo.blur_hash }} 
                source={{ uri: photo.urls.regular }} 
                style={[styles.image, { width: COLUMN_WIDTH, height: imageHeight }]} 
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: GRID_GAP / 2,
    },
    image: {
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
});

export const PhotoItem = memo(PhotoItemComponent);
