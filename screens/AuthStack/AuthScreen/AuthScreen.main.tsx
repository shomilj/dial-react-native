import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, Platform } from "react-native";
import React from "react";
import firebase from "firebase";
import { styles } from "./AuthScreen.styles";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";

const logo = require("../../../assets/icon.png");

/* AuthScreen is the only "authentication" screen that this app has. 
    Usually, we'll want a couple of different screens in this stack 
    (e.g. Sign In, Sign Up, etc.) but for simplicity, this app only 
    has one screen. Here, we set up boilerplate code that deals with
    Sign in with Apple. If you're going for something like this,
    you'll probably want to look at the latest Sign in with Apple
    code via Firebase/Expo - this might be a little outdated.

    https://docs.expo.io/versions/latest/sdk/apple-authentication/
    https://docs.expo.io/guides/using-firebase/#listening-for-authentication

    At a high level, this is a two-step process:

      1. Attempt to sign in with Apple. This returns a credential
          if it succeeds (AppleAuthentication.signInAsync).

      2. Pass the credential to Firebase, to tie the Apple account
          to Firebase Authentication.

    If any step of this fails, we simply log an error, but 
    you'll probably want to display an alert to the user.
*/
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

  const signInPressed = async () => {
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
      // At this point, this user should be signed in!
      // The EntryStackScreen will automatically switch to the
      // RootStack, so we don't need to explicitly
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        console.log("User cancelled signInWithApple");
      } else {
        console.log("signInWithApple error: ", e);
      }
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
          onPress={signInPressed}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Feeds</Text>
      {appleButton()}
    </SafeAreaView>
  );
};
