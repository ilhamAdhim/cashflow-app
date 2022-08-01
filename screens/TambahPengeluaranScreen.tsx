import React, { useState } from "react";
import { Alert, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import InputField from "../components/InputField";
import ButtonCustom from "../components/ButtonCustom";
import {
  getDBConnection,
  saveFinancialRecords,
} from "../db/db-service.records";

const db = getDBConnection();
function TambahPengeluaranScreen({ navigation }: any) {
  const [date, setDate] = useState(new Date());
  const [nominal, setNominal] = useState("");
  const [notes, setNotes] = useState("");

  const onChange = (event: any, selectedDate: any) => setDate(selectedDate);

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => showMode("date");

  const handleSubmitData = () => {
    saveFinancialRecords(db, {
      nominal: parseInt(nominal),
      notes,
      date: date.toLocaleDateString(),
      category: "pengeluaran",
    });
    Alert.alert("Data Tersimpan");
  };

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <InputField
        isDisabled
        icon="calendar"
        role="tanggal_pemasukan"
        text={date.toLocaleDateString()}
        showDatepicker={showDatepicker}
        placeholder="Pilih tanggal transaksi"
      />

      <InputField
        icon="money"
        role="nominal"
        text={nominal.toString()}
        updateText={setNominal}
        placeholder="Masukkan nominal Rupiah ..."
      />

      <InputField
        icon="sticky-note"
        role="notes"
        text={notes}
        updateText={setNotes}
        placeholder="Masukkan catatan  ..."
      />

      <InputField
        isDisabled
        icon="level-down"
        role="kategori"
        text="pengeluaran"
        placeholder="Kategori..."
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
          icon="save"
          isDisabled={
            nominal === "" || notes === "" || date.toLocaleDateString() === ""
              ? true
              : false
          }
          text="Simpan Data"
          backgroundColor="#076302"
          onPress={handleSubmitData}
        />

        <View style={{ flex: 0.1 }} />

        <ButtonCustom
          icon="arrow-circle-left"
          text="Kembali"
          backgroundColor="#f78783"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

export default TambahPengeluaranScreen;
