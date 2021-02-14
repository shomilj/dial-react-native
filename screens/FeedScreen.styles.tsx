import { StyleSheet } from "react-native";
import { TEXT_GRAY } from "../Constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  headerRow: {
    paddingVertical: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    borderBottomColor: "#dfe6e9",
    flexDirection: "row",
    backgroundColor: "white",
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
  scrollView: {
    margin: 10,
  },
});
