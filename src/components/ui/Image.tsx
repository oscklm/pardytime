import { Image as ExpoImage } from "expo-image";

interface Props extends React.ComponentPropsWithoutRef<typeof ExpoImage> {
	storageId: number;
}

const BUNNY_CDN_PULLZONE = process.env.EXPO_PUBLIC_BUNNY_CDN_PULLZONE as string;

const Image = ({
	// Normal props
	storageId,
	style,
	...props
}: Props) => {
	const href = `https://https://${BUNNY_CDN_PULLZONE}.b-cdn.net/${storageId}`;
	return <ExpoImage source={{ uri: href }} {...props} />;
};

export { Image };
