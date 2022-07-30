import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

interface IButtonCustom {
  text: string;
  onPress: () => void;
  backgroundColor: string;
}

const ButtonCustom: React.FC<IButtonCustom> = ({
  text,
  onPress,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        backgroundColor: backgroundColor,
        padding: 10,
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
