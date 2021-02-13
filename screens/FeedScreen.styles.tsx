import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  headerRow: {
    marginVertical: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
    borderBottomColor: "#dfe6e9",
    flexDirection: "row",
  },
  headerLogo: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    borderRadius: 40,
  },
  headerTitle: {
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "700",
    marginHorizontal: 15,
  },
  headerRightButton: {
    marginRight: 16,
    marginLeft: "auto",
  },
});
