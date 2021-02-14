import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AuthStackScreen } from "./AuthStackScreen";
import { RootStackScreen } from "./RootStackScreen";
import firebase from "firebase";
import { firebaseConfig } from "../keys";

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

export function EntryStackScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [setUser]);

  if (initializing) {
    return <View />;
  } else if (!user) {
    return AuthStackScreen();
  } else {
    return RootStackScreen();
  }
}
