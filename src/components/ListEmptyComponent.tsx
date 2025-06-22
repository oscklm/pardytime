import { Text } from "react-native";
import { AnimatedSpinner } from "./AnimatedSpinner";
import YStack from "./ui/YStack";

interface ListEmptyComponentProps {
	status: "pending" | "error" | "success";
	message?: string;
	descriptor?: string;
}

export const ListEmptyComponent = ({
	status,
	message,
	descriptor = "items",
}: ListEmptyComponentProps) => {
	return (
		<YStack flex={1} gap="md">
			{status === "pending" && <AnimatedSpinner variant="flat" size={32} />}
			{status === "error" && <Text>{message || "Error"}</Text>}
			{status === "success" && (
				<Text>{message || `No ${descriptor} found`}</Text>
			)}
		</YStack>
	);
};
