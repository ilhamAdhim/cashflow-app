import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

function InputField({ text, updateText, placeholder, icon }) {
  return (
    <View>
      <View
        style={{ flexDirection: "row", marginHorizontal: 20, marginTop: 20 }}
      >
        <View style={styles.iconStyle}>
          <FontAwesome name={icon} size={20} color="#bdbdbd" />
        </View>

        <TextInput
          value={text}
          placeholder={placeholder}
          onChangeText={updateText}
          style={styles.inputFieldStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputFieldStyle: {
    backgroundColor: "#ffffff",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 2,
    width: 250,
  },
  iconStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    backgroundColor: "#ffffff",
    elevation: 2,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default InputField;
