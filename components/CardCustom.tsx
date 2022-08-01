import { useLinkProps } from "@react-navigation/native";
import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ICardContent {
  title: string;
  imageSource?: any;
  canRedirect?: boolean;
  redirectTo?: any;
}

const CardCustom = ({ to, action, children, isDisabled, ...rest }: any) => {
  const { onPress, ...props } = useLinkProps({ to, action });
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDisabled ? "#9fa1a0" : "#b8dbc2",
        },
      ]}
      disabled={isDisabled}
      onPress={
        isDisabled
          ? Alert.alert(
              "Data Kosong",
              "Silahkan tambahkan data pemasukan atau pengeluaran terlebih dahulu",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            )
          : onPress
      }
      {...props}
      {...rest}
    >
      <CardContent title={rest.title} imageSource={rest.imageSource} />
    </TouchableOpacity>
  );
};

export default CardCustom;

export const CardContent: React.FC<ICardContent> = ({ title, imageSource }) => (
  <>
    {imageSource && (
      <Image
        style={{
          width: 150,
          height: 150,
          resizeMode: "center",
        }}
        source={imageSource}
      />
    )}

    <Text
      style={{
        fontWeight: "bold",
        textAlign: "center",
        color: title.toLowerCase().includes("pengeluaran")
          ? "#b00b0b"
          : "green",
      }}
    >
      {title}
    </Text>
  </>
);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 10,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
