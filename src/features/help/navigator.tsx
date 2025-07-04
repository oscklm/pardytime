import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GamesScreen } from "./screens/GamesScreen";
import { MenuScreen } from "./screens/MenuScreen";

const Stack = createNativeStackNavigator();

export function HelpStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Menu" component={MenuScreen} />
			<Stack.Screen name="Games" component={GamesScreen} />
		</Stack.Navigator>
	);
}
