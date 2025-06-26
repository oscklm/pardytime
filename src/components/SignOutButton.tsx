import { useAuth } from "@clerk/clerk-expo";
import { ActionSheetIOS } from "react-native";
import Button from "./ui/Button";

const SignOutButton = () => {
	const { signOut } = useAuth();

	const handleSignOut = () => {
		ActionSheetIOS.showActionSheetWithOptions(
			{
				title: "Sign out",
				message: "Are you sure you want to sign out?",
				options: ["Cancel", "Sign out"],
				destructiveButtonIndex: 1,
				cancelButtonIndex: 0,
			},
			(buttonIndex) => {
				if (buttonIndex === 1) {
					signOut();
				}
			},
		);
	};

	return (
		<Button variant="danger" onPress={handleSignOut}>
			Sign out
		</Button>
	);
};

export default SignOutButton;
