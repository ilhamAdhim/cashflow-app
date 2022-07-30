import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import ButtonCustom from "../components/ButtonCustom";
import { CardContent } from "../components/CardCustom";
import InputField from "../components/InputField";

function PengaturanScreen({ navigation }: any) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <View
      style={{
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
          marginTop: 30,
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <ButtonCustom
          text="Simpan Data"
          backgroundColor="#076302"
          onPress={() => Alert.alert("Data Tersimpan")}
        />

        <View style={{ flex: 0.1 }} />

        <ButtonCustom
          text="Kembali"
          backgroundColor="#f78783"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ ...styles.cardFooter, marginTop: "auto", padding: 10 }}>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          Aplikasi ini dibuat oleh
        </Text>
        <Text style={{ textAlign: "justify" }}>Muhammad Ilham Adhim</Text>
        <Text style={{ textAlign: "justify" }}>1841720076</Text>
        <Text style={{ textAlign: "justify" }}>
          Tanggal {new Date().toLocaleDateString()}
        </Text>
      </View>
    </View>
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
