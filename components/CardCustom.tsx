import { useLinkProps, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

interface ICardContent {
  title: string;
  imageSource?: any;
  canRedirect?: boolean;
  redirectTo?: any;
}

const CardCustom = ({ to, action, children, ...rest }: any) => {
  const { onPress, ...props } = useLinkProps({ to, action });
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
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
        color: title.toLowerCase().includes("pengeluaran") ? "red" : "green",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {title}
    </Text>
  </>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#b8dbc2",
    paddingVertical: 14,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 2,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
