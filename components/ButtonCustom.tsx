import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

interface IButtonCustom {
  text: string;
  isDisabled?: boolean;
  onPress: () => void;
  backgroundColor: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}

const ButtonCustom: React.FC<IButtonCustom> = ({
  text,
  isDisabled,
  onPress,
  backgroundColor,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 15,
        borderRadius: 10,
        opacity: isDisabled ? 0.5 : 1,
        backgroundColor: backgroundColor,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      disabled={isDisabled}
      onPress={onPress}
    >
      <FontAwesome
        name={icon}
        size={20}
        color="white"
        style={{ marginHorizontal: 2 }}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",

          marginHorizontal: 2,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
