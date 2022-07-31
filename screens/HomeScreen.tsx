import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CardCustom from "../components/CardCustom";
import PengaturanScreen from "./PengaturanScreen";
import DetailCashflowScreen from "./DetailCashflowScreen";
import TambahPemasukanScreen from "./TambahPemasukanScreen";
import TambahPengeluaranScreen from "./TambahPengeluaranScreen";
import {
  getDataByCategory,
  getDBConnection,
  getTotalByCategory,
} from "../db/db-service.records";
import { renderRupiah } from "../common";
import { LineChart } from "react-native-chart-kit";

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
  const [isDataFetched, setIsDataFetched] = React.useState(false);

  const [totalPemasukan, setTotalPemasukan] = React.useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = React.useState(0);

  const [dataPemasukan, setDataPemasukan] = React.useState([]);
  const [dataPengeluaran, setDataPengeluaran] = React.useState([]);

  const loadDataCallback = useCallback(async () => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action and update data
      try {
        Promise.all([
          getTotalByCategory(db, setTotalPemasukan, "pemasukan"),
          getTotalByCategory(db, setTotalPengeluaran, "pengeluaran"),
          getDataByCategory(db, setDataPemasukan, "pemasukan"),
          getDataByCategory(db, setDataPengeluaran, "pengeluaran"),
        ]).then(() => setIsDataFetched(true));
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
    if (isDataFetched) {
      let dataNominalPemasukan: any = [];
      let dataNominalPengeluaran: any = [];

      dataPemasukan?.map((item: any) =>
        dataNominalPemasukan.push(item.nominal)
      );
      dataPengeluaran?.map((item: any) =>
        dataNominalPengeluaran.push(item.nominal)
      );

      console.log("dataNominalPemasukan ", dataNominalPemasukan);
      console.log("dataNominalPengeluaran ", dataNominalPengeluaran);
    }
  }, [isDataFetched, dataPemasukan, dataPengeluaran]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#dbe4f3" barStyle="dark-content" />
      <View style={styles.topSection}>
        <Text style={{ fontWeight: "bold" }}>Halo, Muhammad Ilham Adhim !</Text>
        <Text>
          Saldo anda saat ini {renderRupiah(totalPemasukan - totalPengeluaran)}
        </Text>
      </View>
      <View style={styles.row}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: "#b8dbc2",
            },
          ]}
        >
          <Text style={{ fontWeight: "bold", color: "green" }}>
            Pemasukan Bulan Ini
          </Text>
          <Text style={{ fontWeight: "bold", color: "green" }}>
            {` ${renderRupiah(totalPemasukan)}`}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: "#f78783",
            },
          ]}
        >
          <Text style={{ fontWeight: "bold", color: "#b00b0b" }}>
            Pengeluaran Bulan Ini
          </Text>
          <Text style={{ fontWeight: "bold", color: "#b00b0b" }}>
            {` ${renderRupiah(totalPengeluaran)}`}
          </Text>
        </View>
      </View>

      {isDataFetched && dataPemasukan.length > 0 && dataPengeluaran.length > 0 && (
        <View style={styles.chartStyle}>
          <LineChart
            bezier
            withInnerLines={false}
            withOuterLines={false}
            height={500}
            width={Dimensions.get("window").width - 30} // from react-native
            data={{
              labels:
                dataPemasukan.length > dataPengeluaran.length
                  ? dataPemasukan.map((item: any) => item.date)
                  : dataPengeluaran.map((item: any) => item.date),
              datasets: [
                {
                  data: dataPemasukan?.map((item: any) =>
                    parseInt(item.nominal)
                  ),
                  strokeWidth: 2,
                  color: () => `#b8dbc2`, // optional
                },
                {
                  data: dataPengeluaran?.map((item: any) =>
                    parseInt(item.nominal)
                  ),
                  strokeWidth: 2,
                  color: () => `#f78783`, // optional
                },
              ],
              legend: ["Pemasukan", "Pengeluaran"],
            }}
            formatYLabel={(value) => renderRupiah(parseInt(value))}
            chartConfig={{
              color: (opacity = 1) => "#575757",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",

              decimalPlaces: 0, // optional, defaults to 2dp
            }}
            style={{
              borderRadius: 4,
              elevation: 10,
              marginHorizontal: 16,
            }}
          />
        </View>
      )}

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
    </ScrollView>
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
    paddingBottom: 20,
  },

  chartStyle: {
    height: 600,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  topSection: {
    textAlign: "left",
    marginLeft: 20,
    marginVertical: 10,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },

  columns: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  card: {
    padding: 10,
    paddingVertical: 14,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 5,
    flexWrap: "wrap",
    alignItems: "center",
  },
});
