import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    height: 150,
    width: 150,
    marginTop: "30%",
    resizeMode: "contain",
    borderRadius: 30,
  },
  subtitle: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "100",
    marginTop: 10,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 20,
  },
  appleButtonView: {
    height: 50,
    width: "90%",
    marginTop: "auto",
    marginBottom: 20,
    justifyContent: "center",
    borderRadius: 10,
  },
  googleLogo: {
    height: 20,
    width: 20,
    alignSelf: "center",
    marginRight: 10,
  },
  googleButton: {
    height: 45,
    marginTop: "auto",
    width: "60%",
    marginHorizontal: 100,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
  googleButtonPng: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  buttonText: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "400",
    margin: "auto",
    color: "black",
    textAlign: "center",
  },
});
