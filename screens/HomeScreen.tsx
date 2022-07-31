import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import CardCustom from "../components/CardCustom";
import PengaturanScreen from "./PengaturanScreen";
import DetailCashflowScreen from "./DetailCashflowScreen";
import TambahPemasukanScreen from "./TambahPemasukanScreen";
import TambahPengeluaranScreen from "./TambahPengeluaranScreen";
import {
  getDBConnection,
  getTotalPemasukan,
  getTotalPengeluaran,
} from "../db/db-service";
import { renderRupiah } from "../common";

type IStackHomeParamList = {
  Home: undefined;
  Pengaturan: undefined;
  "Detail Cashflow": undefined;
  "Tambah Pemasukan": undefined;
  "Tambah Pengeluaran": undefined;
};

const db = getDBConnection();
const Stack = createNativeStackNavigator<IStackHomeParamList>();

function HomeScreen({ navigation }: any) {
  const [totalPemasukan, setTotalPemasukan] = React.useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = React.useState(0);

  const loadDataCallback = useCallback(async () => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action and update data
      console.log("apa bener navigasi");
      try {
        getTotalPemasukan(db, setTotalPemasukan);
        getTotalPengeluaran(db, setTotalPengeluaran);
      } catch (error) {
        console.error(error);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  useEffect(() => {
    console.log(totalPemasukan);
    console.log(totalPengeluaran);
  }, [totalPemasukan, totalPengeluaran]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#dbe4f3" barStyle="dark-content" />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "green" }}>
          Pemasukan Bulan Ini
          {` ${renderRupiah(totalPemasukan)}`}
        </Text>
        <Text style={{ fontWeight: "bold", color: "#b00b0b" }}>
          Pengeluaran Bulan Ini
          {` ${renderRupiah(totalPengeluaran)}`}
        </Text>
      </View>
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
      <Stack.Screen name="Detail Cashflow" component={DetailCashflowScreen} />
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
