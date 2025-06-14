import { Text, View } from "react-native";
import type { Doc } from "@/convex/_generated/dataModel";

interface BoardCardProps {
	title?: Doc<"boards">;
}

const BoardCard = ({ title }: BoardCardProps) => {
	return (
		<View>
			<Text>{title}</Text>
		</View>
	);
};

export default BoardCard;
