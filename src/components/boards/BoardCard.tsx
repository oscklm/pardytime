import type { Doc } from "@/convex/_generated/dataModel";
import { Card } from "../ui/Card";
import Text from "../ui/Text";

interface BoardCardProps {
	board: Doc<"boards">;
}

const BoardCard = ({ board }: BoardCardProps) => {
	return (
		<Card>
			<Text variant="h3">{board.title}</Text>
			<Text variant="secondary">{board.description}</Text>
		</Card>
	);
};

export default BoardCard;
