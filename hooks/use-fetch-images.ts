import { PhotosListData } from "@/data/photos-list-data";
import { useEffect, useState } from "react";


export function useFetchImages() {
const baseUrl = process.env.EXPO_PUBLIC_UNSPLASH_API_URL;
const accessKey = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;

 const [page, setPage] = useState<number>(1);
 const [perPage, setPerPage] = useState<number>(10);

  const [photosListData, setPhotosListData] = useState<PhotosListData>({ photos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

async function fetchImages() {
  try {
    const response = await fetch(`${baseUrl}/photos?page=${page}&per_page=${perPage}`, {
      headers: {
        'Authorization': `Client-ID ${accessKey}`
      }
    });
    const data = await response.json();
    setPhotosListData({ photos: [...photosListData.photos, ...data] });
    setLoading(false);
  } catch (error) {
    console.error(error);
    setError(error as Error);
    setLoading(false);
  }
}


async function fetchMoreImages() {
  try {
    const Header = {
    'Authorization': `Client-ID ${accessKey}`
  }
  const response = await fetch(`${baseUrl}/photos?page=${page}&per_page=${perPage}`, {
    headers: Header
  });
  const data = await response.json();
  setPhotosListData({ photos: [...photosListData.photos, ...data] });
  setLoading(false);
} catch (error) {
  console.error(error);
  setError(error as Error);
  setLoading(false);
}
}

return { photosListData, loading, error, fetchMoreImages };

}