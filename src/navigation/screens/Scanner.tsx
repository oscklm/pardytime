import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { AppState, Linking, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ScannerOverlay } from "@/components/ScannerOverlay";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export function Scanner() {
	const qrLock = useRef(false);
	const appState = useRef(AppState.currentState);
	const [permission, requestPermission] = useCameraPermissions();
	const [isScanned, setIsScanned] = useState(false);

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (nextAppState) => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === "active"
			) {
				qrLock.current = false;
				setIsScanned(false);
			}
			appState.current = nextAppState;
		});

		return () => {
			subscription.remove();
		};
	}, []);

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission}>Grant permission</Button>
			</View>
		);
	}

	return (
		<YStack flex={1} gap="md" pd="lg" insetBottom>
			<CameraView
				style={styles.camera}
				facing={"back"}
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
				onBarcodeScanned={async ({ data }) => {
					if (data && !qrLock.current) {
						qrLock.current = true;
						setIsScanned(true);
						setTimeout(async () => {
							await Linking.openURL(data);
						}, 500);
					}
				}}
			>
				<ScannerOverlay isScanned={isScanned} />
			</CameraView>
		</YStack>
	);
}

const styles = StyleSheet.create((th) => ({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
		borderRadius: th.radius.lg,
		overflow: "hidden",
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
	mask: {
		flex: 1,
	},
	cutout: {
		width: 250,
		height: 250,
		borderWidth: 2,
		borderColor: "white",
		borderRadius: th.radius.lg,
	},
}));
