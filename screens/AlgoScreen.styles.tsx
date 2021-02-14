import { StyleSheet } from "react-native";
import { TEXT_DARK_GRAY, TEXT_GRAY, TEXT_PRIMARY } from "../Constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FBFBFB",
  },
  headerRow: {
    marginVertical: 20,
    paddingBottom: 0,
    marginHorizontal: 20,
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
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 380,
    width: "100%",
  },
  textView: {
    margin: 30,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "700",
  },
  stars: {
    marginVertical: 10,
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "300",
    color: TEXT_GRAY,
  },
  description: {
    marginVertical: 10,
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "300",
    color: TEXT_DARK_GRAY,
  },
  algoCellActivateTextActive: {
    marginHorizontal: 5,
    fontFamily: "Avenir",
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  algoCellActivateTextNotActive: {
    marginHorizontal: 5,
    fontFamily: "Avenir",
    color: TEXT_DARK_GRAY,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  algoCellButtonViewActive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    backgroundColor: TEXT_DARK_GRAY,
    borderColor: TEXT_DARK_GRAY,
    color: "white",
    borderWidth: 0.5,
    borderRadius: 16,
    opacity: 1.0,
    height: 50,
  },
  algoCellButtonViewNotActive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    backgroundColor: "white",
    borderColor: TEXT_DARK_GRAY,
    borderWidth: 0.5,
    borderRadius: 16,
    opacity: 1.0,
    height: 50,
  },
});
