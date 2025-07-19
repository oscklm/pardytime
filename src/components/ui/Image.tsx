import { Image as ExpoImage } from "expo-image";
import { withUnistyles } from "react-native-unistyles";

interface Props extends React.ComponentPropsWithoutRef<typeof ExpoImage> {
  storageId?: string;
  width?: number;
  height?: number;
  quality?: number;
}

const BUNNY_CDN_PULLZONE = process.env.EXPO_PUBLIC_BUNNY_CDN_PULLZONE as string;

const UniImage = withUnistyles(ExpoImage);

const Image = ({
  // Normal props
  storageId,
  width,
  height,
  quality,
  source,
  ...props
}: Props) => {
  const widthParam = width ? `&width=${width}` : "";
  const heightParam = height ? `&height=${height}` : "";
  const qualityParam = quality ? `&quality=${quality}` : "";

  // Construct the URL
  const href = `https://${BUNNY_CDN_PULLZONE}.b-cdn.net/${storageId}?optimizer=image${widthParam}${heightParam}${qualityParam}`;
  return (
    <UniImage
      recyclingKey={storageId}
      source={storageId ? { uri: href } : source}
      {...props}
      transition={300}
    />
  );
};

export { Image };
