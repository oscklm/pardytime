import { useAuth } from "@clerk/clerk-expo";
import Button from "./ui/Button";

const SignOutButton = () => {
	const { signOut } = useAuth();
	return <Button variant="error" label="Sign Out" onPress={() => signOut()} />;
};

export default SignOutButton;
