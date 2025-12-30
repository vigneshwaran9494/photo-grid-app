import { Image, ImageContentFit } from 'expo-image';
import { memo, useEffect, useState } from 'react';
import { ImageStyle, StyleProp } from 'react-native';

export interface ProgressiveImageProps {
  blurHash: string;
  urls: string[];
  mode?: 'list' | 'modal';
  contentFit?: ImageContentFit;
  style?: StyleProp<ImageStyle>;
  transition?: number;
}

/**
 * Progressive image loader component
 * - For list mode: loads the first URL (regular) by default
 * - For modal mode: loads regular first, then progressively loads full when regular completes
 */
function ProgressiveImageComponent({
  blurHash,
  urls,
  mode = 'list',
  contentFit = 'cover',
  style,
  transition = 200,
}: ProgressiveImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // For list mode, only use the first URL (regular)
  // For modal mode, start with regular (index 0), then move to full (index 1) when ready
  const currentUrl = urls[currentImageIndex] || urls[0];

  // Reset to first image when mode or URLs change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [mode, urls]);

  const handleLoadEnd = () => {
    // In modal mode, after regular (index 0) loads, progress to full (index 1)
    if (mode === 'modal' && currentImageIndex === 0 && urls.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  return (
    <Image
      source={{ uri: currentUrl }}
      placeholder={{ blurhash: blurHash }}
      contentFit={contentFit}
      style={style}
      transition={transition}
      onLoadEnd={handleLoadEnd}
      cachePolicy="memory-disk"
    />
  );
}

export const ProgressiveImage = memo(ProgressiveImageComponent);

