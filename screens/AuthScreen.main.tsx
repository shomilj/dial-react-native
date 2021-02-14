import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, Platform, View } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { styles } from "./AuthScreen.styles";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";
import { TouchableOpacity } from "react-native-gesture-handler";

const logo = require("../assets/icon.png");

export const AuthScreen = () => {
  const registerWithFirebase = async (
    credential: firebase.auth.OAuthCredential,
    name: string | null | undefined
  ) => {
    try {
      await firebase.auth().signInWithCredential(credential);
      console.log("firebase signInWithCredential completed successfully.");
      const displayName = firebase.auth().currentUser?.displayName;
      if (!displayName) {
        firebase.auth().currentUser?.updateProfile({
          displayName: name,
        });
      }
    } catch (error) {
      console.log("firebase signInWithCredential failed: ", error);
    }
  };

  const appleButton = () => {
    if (Platform.OS == "ios") {
      return (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.appleButtonView}
          onPress={async () => {
            const csrf = Math.random().toString(36).substring(2, 15);
            const nonce = Math.random().toString(36).substring(2, 10);
            const hashedNonce = await Crypto.digestStringAsync(
              Crypto.CryptoDigestAlgorithm.SHA256,
              nonce
            );
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
                state: csrf,
                nonce: hashedNonce,
              });

              const provider = new firebase.auth.OAuthProvider("apple.com");
              const authCredential = provider.credential({
                idToken: credential.identityToken!,
                rawNonce: nonce,
              });
              await registerWithFirebase(
                authCredential,
                credential.fullName?.givenName
              );
              // signed in
            } catch (e) {
              if (e.code === "ERR_CANCELED") {
                console.log("User cancelled signInWithApple");
              } else {
                console.log("signInWithApple error: ", e);
              }
            }
          }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.title}>Feeds</Text>
      {appleButton()}
    </SafeAreaView>
  );
};
