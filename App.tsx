import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InputField from "./components/InputField";
import LoginImage from "./components/svgs/LoginImage";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <Navigation colorScheme={colorScheme} /> */}
        <View style={{ flex: 1, backgroundColor: "#dbe4f3" }}>
          <StatusBar backgroundColor="#dbe4f3" barStyle="dark-content" />
          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}> Cashflow App </Text>
            <LoginImage />
            <InputField
              icon="user"
              text={username}
              updateText={setUsername}
              placeholder="Masukkan username . . ."
            />
            <InputField
              icon="lock"
              text={password}
              updateText={setPassword}
              placeholder="Masukkan password . . ."
            />

            <TouchableOpacity
              style={{
                width: 300,
                backgroundColor: "#2e86de",
                paddingVertical: 14,
                marginTop: 20,
                marginHorizontal: 20,
                borderRadius: 15,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                children="Login"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <StatusBar /> */}
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },

  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    display: "flex",
    textAlign: "center",
    color: "#14109c",
  },
});
