import { Image as ExpoImage } from "expo-image";
import { withUnistyles } from "react-native-unistyles";

interface Props extends React.ComponentPropsWithoutRef<typeof ExpoImage> {
	storageId?: number;
}

const BUNNY_CDN_PULLZONE = process.env.EXPO_PUBLIC_BUNNY_CDN_PULLZONE as string;

const UniImage = withUnistyles(ExpoImage);

const Image = ({
	// Normal props
	storageId,
	source,
	...props
}: Props) => {
	const href = `https://https://${BUNNY_CDN_PULLZONE}.b-cdn.net/${storageId}`;
	return <UniImage source={storageId ? { uri: href } : source} {...props} />;
};

export { Image };
