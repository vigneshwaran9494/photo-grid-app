import { Photo } from "@/data/photos-list-data";
import { Image } from "expo-image";
import { View } from "react-native";

export function PhotoItem({ photo }: { photo: Photo }) {
    return (
        <View>
            <Image contentFit="cover" placeholder={{ blurhash: photo.blur_hash }} source={{ uri: photo.urls.regular }} style={{ width: '100%', height: 200 }} />
        </View>
    );
}
