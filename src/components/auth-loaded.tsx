import { useConvexAuth } from "convex/react";
import LoadingView from "./loading-view";

export const AuthLoaded = ({ children }: React.PropsWithChildren<unknown>) => {
	const { isLoading } = useConvexAuth();

	if (isLoading) {
		return <LoadingView />;
	}

	return children;
};
