import React, { useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import InputField from "../components/InputField";
import ButtonCustom from "../components/ButtonCustom";

function TambahPengeluaranScreen({ navigation }: any) {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
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
        text={date.toLocaleString()}
        showDatepicker={showDatepicker}
        placeholder="Pilih tanggal transaksi"
      />

      <InputField
        icon="money"
        role="nominal"
        text={amount}
        updateText={setAmount}
        placeholder="Masukkan nominal ..."
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
    </View>
  );
}

export default TambahPengeluaranScreen;
