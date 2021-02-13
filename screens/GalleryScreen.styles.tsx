import { StyleSheet } from "react-native";
import { TEXT_DARK_GRAY, TEXT_GRAY, TEXT_PRIMARY } from "../Constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FBFBFB",
  },
  headerRow: {
    marginVertical: 20,
    paddingBottom: 0,
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
  algoCategoryCell: {
    margin: 10,
    flexDirection: "column",
  },
  algoCategoryHeader: {
    margin: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  algoCategoryHeaderText: {
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 10,
    color: TEXT_DARK_GRAY,
  },
  algoCategoryHeaderLine: {
    fontFamily: "Avenir",
    fontSize: 26,
    fontWeight: "200",
    color: TEXT_DARK_GRAY,
  },
  algoCategoryList: {
    margin: 15,
  },
  algoCell: {
    margin: 10,
    width: 180,
    backgroundColor: "white",
    borderRadius: 8,
  },
  algoCellImage: {
    height: 120,
    width: "100%",
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    resizeMode: "cover",
  },
  algoCellTitle: {
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "800",
  },
  algoCellSubtitle: {
    marginVertical: 10,
    marginHorizontal: 20,
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "300",
    color: TEXT_GRAY,
  },
  algoCellButtonView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 5,
  },
  algoCellActivateButton: {
    marginLeft: 12,
  },
  algoCellActivateText: {
    marginHorizontal: 5,
    fontFamily: "Avenir",
    color: TEXT_PRIMARY,
    fontSize: 12,
    fontWeight: "800",
  },
  algoCellMoreButton: {
    marginRight: 16,
    marginLeft: "auto",
  },
});
