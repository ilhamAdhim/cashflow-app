import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { renderRupiah } from "../common";
import { getDBConnection, getFinancialRecords } from "../db/db-service";
import { FinancialRecord } from "../models";

const db = getDBConnection();
const DetailCashflowScreen: React.FC = () => {
  const [dataRecords, setDataRecords] = useState<FinancialRecord[]>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          nominal: 100000,
          notes: "Ingfo Dicoding",
          date: "01/01/2000",
          category: "pemasukan",
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          nominal: 100000,
          notes: "Beli makanan",
          date: "01/01/2000",
          category: "pengeluaran",
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f65",
          nominal: 70000,
          notes: "Beli jajan",
          date: "01/01/2002",
          category: "pengeluaran",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d73",
          nominal: 100000,
          notes: "Ingfo pak Imam",
          date: "01/01/2000",
          category: "pemasukan",
        },
      ];

      await getFinancialRecords(db, setDataRecords, initTodos);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }: any) => {
    return <Item item={item} onPress={() => setSelectedId(item.id)} />;
  };

  return (
    <FlatList
      data={dataRecords}
      renderItem={renderItem}
      keyExtractor={(item) => item.id || item.notes}
      extraData={selectedId}
    />
  );
};

const Item = ({ item, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.item,
      {
        borderColor: item.category === "pemasukan" ? "#b8dbc2" : "#f78783",
      },
    ]}
  >
    <View>
      <Text
        style={[
          styles.title,
          {
            color: item.category === "pemasukan" ? "#076302" : "#b00b0b",
          },
        ]}
      >
        {renderRupiah(item.nominal)}
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: "black",
          },
        ]}
      >
        {item.notes}
      </Text>
      <Text style={{ color: "gray" }}>{item.date}</Text>
    </View>

    <FontAwesome
      style={{ alignSelf: "center" }}
      size={30}
      name={
        item.category === "pemasukan" ? "arrow-circle-up" : "arrow-circle-down"
      }
      color={item.category === "pemasukan" ? "#076302" : "#b00b0b"}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderWidth: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 16,
  },
});

export default DetailCashflowScreen;
