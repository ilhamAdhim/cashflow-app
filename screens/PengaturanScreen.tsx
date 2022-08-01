import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonCustom from "../components/ButtonCustom";
import InputField from "../components/InputField";
import { getDBConnection } from "../db/db-service.records";
import {
  changePassword,
  getUser,
  getUserWithPassword,
} from "../db/db-service.user";

const db = getDBConnection();

interface IUser {
  id: number;
  username: string;
  password: string;
}

function PengaturanScreen({ navigation }: any) {
  const [user, setUser] = useState<IUser>({
    id: 0,
    username: "",
    password: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const validateChangePassword = () =>
    getUserWithPassword(db, currentPassword, newPassword);

  const loadDataCallback = useCallback(async () => {
    const unsubscribe = navigation.addListener("focus", () => {
      try {
        getUser(db, setUser);
      } catch (error) {
        console.error(error);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log(user, "user kah ini");
  }, [user]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <View style={styles.card}>
        <FontAwesome name="user-circle-o" color="gray" size={100} />
        <Text style={{ fontWeight: "bold", marginTop: 10 }}> Admin </Text>
      </View>

      <InputField
        text={currentPassword}
        updateText={setCurrentPassword}
        placeholder="Password saat ini ..."
        role="password"
        icon="lock"
      />
      <InputField
        text={newPassword}
        updateText={setNewPassword}
        placeholder="Password Baru ..."
        role="password"
        icon="lock"
      />

      <View
        style={{
          marginVertical: 30,
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <ButtonCustom
          isDisabled={currentPassword === "" || newPassword === ""}
          icon="save"
          text="Simpan Data"
          backgroundColor="#076302"
          onPress={validateChangePassword}
        />

        <View style={{ flex: 0.1 }} />

        <ButtonCustom
          icon="arrow-circle-o-left"
          text="Kembali"
          backgroundColor="#f78783"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ ...styles.cardFooter, marginTop: "auto", padding: 10 }}>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          Aplikasi ini dibuat oleh
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 20,
          }}
        >
          <Image
            source={require("../assets/images/1841720076.jpeg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ textAlign: "justify" }}>Muhammad Ilham Adhim</Text>
            <Text style={{ textAlign: "justify" }}>1841720076</Text>
            <Text style={{ textAlign: "justify" }}>Tanggal 30 Juli 2022</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default PengaturanScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#b8dbc2",
    paddingVertical: 14,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    width: "80%",
    elevation: 2,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cardFooter: {
    backgroundColor: "#b8dbc2",
    paddingVertical: 14,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 10,
    width: "100%",
  },
});
