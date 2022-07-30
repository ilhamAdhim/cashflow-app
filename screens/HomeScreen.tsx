import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import CardCustom from "../components/CardCustom";
import PengaturanScreen from "./PengaturanScreen";
import RiwayatScreen from "./RiwayatScreen";
import TambahPemasukanScreen from "./TambahPemasukanScreen";
import TambahPengeluaranScreen from "./TambahPengeluaranScreen";

type IStackHomeParamList = {
  Home: undefined;
  Pengaturan: undefined;
  "Detail Cashflow": undefined;
  "Tambah Pemasukan": undefined;
  "Tambah Pengeluaran": undefined;
};

const Stack = createNativeStackNavigator<IStackHomeParamList>();
const Tab = createBottomTabNavigator<IStackHomeParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#dbe4f3" barStyle="dark-content" />
      <View style={styles.buttonWrapper}>
        <CardCustom
          to={{ screen: "Tambah Pemasukan" }}
          title="Tambah Pemasukan"
          imageSource={require("../assets/images/undraw_Credit_card_payments_re_qboh-removebg-preview.png")}
        />
        <CardCustom
          to={{ screen: "Tambah Pengeluaran" }}
          title="Tambah Pengeluaran"
          imageSource={require("../assets/images/undraw_Make_it_rain_re_w9pc-removebg-preview.png")}
        />
        <CardCustom
          to={{ screen: "Detail Cashflow" }}
          title="Detail Cashflow"
          imageSource={require("../assets/images/undraw_Report_re_f5n5-removebg-preview.png")}
        />
        <CardCustom
          to={{ screen: "Pengaturan" }}
          title="Pengaturan"
          imageSource={require("../assets/images/undraw_Personal_settings_re_i6w4__1_-removebg-preview.png")}
        />
      </View>
    </View>
  );
}

function HomeScreenNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tambah Pemasukan" component={TambahPemasukanScreen} />
      <Stack.Screen
        name="Tambah Pengeluaran"
        component={TambahPengeluaranScreen}
      />
      <Stack.Screen name="Detail Cashflow" component={RiwayatScreen} />
      <Stack.Screen name="Pengaturan" component={PengaturanScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreenNavigator;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
