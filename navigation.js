import { NavigationContainer } from "@react-navigation/native";
import Feed from "./Screens/tabScreens/Feed";
import Settings from "./Screens/tabScreens/Settings";
import Notifications from "./Screens/tabScreens/Notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import TweetDetailScreen from "./Screens/HomeStack/TweetDetailsScreen";
import FirebaseSignIn from "./Screens/FirebaseSignIn";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// observe for the user
		onAuthStateChanged(auth, (user) => {
			console.log("USER DETAILS", user);
			setUser(user);
		});
	}, []);

	return (
		<HomeStack.Navigator>
			{user ? (
				<>
					<HomeStack.Screen
						name="TabGroup"
						component={TabGroup}
						options={{ headerShown: false }}
					/>
					<HomeStack.Screen
						name="TweetDetailScreen"
						component={TweetDetailScreen}
					/>
				</>
			) : (
				<HomeStack.Screen name="signin" component={FirebaseSignIn} />
			)}
		</HomeStack.Navigator>
	);
}

function TabGroup() {
	return (
		<Tab.Navigator
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ color, focused, size }) => {
					let iconName;
					if (route.name === "Feed") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "ios-settings-sharp";
					} else if (route.name === "Notifications") {
						iconName = "ios-notifications";
					}
					return (
						<Ionicons name={iconName} size={size} color={color} />
					);
				},
				tabBarActiveTintColor: "red",
				tabBarInactiveTintColor: "green",
			})}
		>
			<Tab.Screen
				name="Feed"
				component={Feed}
				options={{ headerShown: true, tabBarLabel: "@Shasa" }}
			/>
			<Tab.Screen name="Notifications" component={Settings} />
			<Tab.Screen name="Settings" component={Notifications} />
		</Tab.Navigator>
	);
}

export default function Navigation() {
	return (
		<NavigationContainer>
			<HomeStackGroup />
		</NavigationContainer>
	);
}
