import {
	StyleSheet,
	TextInput,
	Button,
	View,
	ActivityIndicator,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";

const FirebaseSignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const signIn = async () => {
		setLoading(true);
		if (email && password) {
			try {
				const response = await signInWithEmailAndPassword(
					auth,
					email,
					password
				).then((data) => {
					console.log(data.user);
				});
			} catch (error) {
				console.log("SOMETHING WENT WRONG:::", error);
			} finally {
				setLoading(false);
			}
		} else {
            setLoading(false);
			console.log("INPUTS ARE EMPTY");
		}
	};

	const signUp = async () => {
		setLoading(true);
		if (email && password) {
			try {
				const response = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				).then((data) => {
					console.log(data.user);
				});
			} catch (error) {
				console.log("SOMETHING WENT WRONG:::", error);
			} finally {
				setLoading(false);
			}
		} else {
            setLoading(false);
			console.log("INPUTS ARE EMPTY");
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView>
				<TextInput
					style={styles.input}
					placeholder="Email"
					autoCapitalize="none"
					onChangeText={(text) => setEmail(text)}
					value={email}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					autoCapitalize="none"
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
				/>
				{loading ? (
					<ActivityIndicator size="large" color={"#000ff"} />
				) : (
					<>
						<Button title="Login" onPress={() => signIn()} />
						<Button title="Sign Up" onPress={() => signUp()} />
					</>
				)}
			</KeyboardAvoidingView>
		</View>
	);
};

export default FirebaseSignIn;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		flex: 1,
		justifyContent: "center",
	},
	input: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: "#fff",
	},
});
