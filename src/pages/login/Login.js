import React, { useState, useEffect } from "react";
import ErrorBoundary from "react-native-error-boundary";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  AsyncStorage
} from "react-native";

import api from "../../services/api";

import logo from "../../assets/logo.png";

export function Login({ navigation }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then(userId => {
      if (userId) {
        navigation.navigate("Main", {
          userId
        });
      }
    });
  }, []);

  async function handleLogin() {
    const response = await api.post("/devs", {
      user
    });

    const { _id } = response.data;

    await AsyncStorage.setItem("user", _id);

    navigation.navigate("Main", {
      userId: _id
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === "ios"}
    >
      <Image source={logo} />
      <TextInput
        value={user}
        onChangeText={text => setUser(text)}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
      />
      <ErrorBoundary onError={onError}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </ErrorBoundary>
    </KeyboardAvoidingView>
  );

  function onError(error, stackTrace) {
    console.log("Erro", error);
    console.log("stack trace", stackTrace);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  input: {
    height: 45,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    marginTop: 20,
    alignSelf: "stretch",
    height: 45,
    backgroundColor: "#DF4723",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
