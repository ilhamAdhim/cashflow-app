import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import InputField from "../components/InputField";
import LoginImage from "../components/svgs/LoginImage";
import {
  createTableFinancialRecords,
  getDBConnection,
} from "../db/db-service.records";

import {
  createTableUser,
  getUser,
  loginUser,
  checkUserRegistered,
} from "../db/db-service.user";

const db = getDBConnection();

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Promise.all([
      createTableFinancialRecords(db),
      createTableUser(db),

      checkUserRegistered(db),
    ]).then(() => setIsAppReady(true));
  }, []);

  const validateLogin = () => loginUser(db, username, password, setIsLoggedIn);

  useEffect(() => {
    if (isAppReady)
      if (isLoggedIn) {
        navigation.navigate("HomeNavigator");
      }
  }, [isAppReady, isLoggedIn]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#dbe4f3" }}>
      <StatusBar backgroundColor="#dbe4f3" barStyle="dark-content" />
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}> Cashflow App </Text>
        <LoginImage />
        <InputField
          role="username"
          icon="user"
          text={username}
          updateText={setUsername}
          placeholder="Masukkan username . . ."
        />
        <InputField
          role="password"
          icon="lock"
          text={password}
          updateText={setPassword}
          placeholder="Masukkan password . . ."
        />

        <TouchableOpacity
          style={
            username.length > 0 && password.length > 0
              ? styles.loginButton
              : styles.disabledLoginButton
          }
          onPress={validateLogin}
          disabled={username.length > 0 && password.length > 0 ? false : true}
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
    </ScrollView>
  );
};

export default LoginScreen;

const styleLoginButton = {
  width: 300,
  backgroundColor: "#2e86de",
  paddingVertical: 14,
  marginTop: 20,
  marginHorizontal: 20,
  borderRadius: 15,
  elevation: 2,
};

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
  },

  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    display: "flex",
    textAlign: "center",
    color: "#14109c",
    marginVertical: 20,
  },

  loginButton: styleLoginButton,

  disabledLoginButton: {
    opacity: 0.3,
    ...styleLoginButton,
  },
});
