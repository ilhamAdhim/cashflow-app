import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";

interface IInputField {
  text: string;
  updateText?: Dispatch<SetStateAction<string>>;
  placeholder: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  role: string;
  isDisabled?: boolean;

  showDatepicker?: any;
}

const InputField: React.FC<IInputField> = ({
  text,
  updateText,
  placeholder,
  icon,
  role,
  isDisabled = false,
  ...props
}) => {
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
          editable={!isDisabled}
          placeholder={placeholder}
          onChangeText={updateText}
          style={
            role.toLowerCase().includes("tanggal")
              ? styles.inputFieldStyleWithDatepicker
              : styles.inputFieldStyle
          }
          secureTextEntry={role === "password" ? true : false}
        />

        {role.toLowerCase().includes("tanggal") && (
          <View style={styles.iconStyleDatePicker}>
            <TouchableOpacity onPress={props.showDatepicker}>
              <FontAwesome name="pencil" size={20} color="#076302" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const inputFieldStyleTemplate = {
  backgroundColor: "#ffffff",
  borderTopRightRadius: 15,
  borderBottomRightRadius: 15,
  paddingLeft: 10,
  paddingVertical: 15,
  paddingHorizontal: 10,
  elevation: 2,
  width: 250,
};

const iconStyleTemplate: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 50,
  backgroundColor: "#ffffff",
  elevation: 2,
  borderTopLeftRadius: 15,
  borderBottomLeftRadius: 15,
};

const styles = StyleSheet.create({
  inputFieldStyle: inputFieldStyleTemplate,

  inputFieldStyleWithDatepicker: {
    ...inputFieldStyleTemplate,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
    width: 200,
  },

  iconStyle: iconStyleTemplate,

  iconStyleDatePicker: {
    ...iconStyleTemplate,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default InputField;
