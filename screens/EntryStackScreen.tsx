import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AuthStackScreen } from "./AuthStack/AuthStackScreen";
import { RootStackScreen } from "./RootStack/RootStackScreen";
import firebase from "firebase";
import { firebaseConfig } from "../keys";

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

/* EntryStackScreen is a container component that wraps our entire
    application. Why do we do this? It has to do with the notion of 
    "lifting state up." Throughout this app, we want to make sure that
    we only show the RootStackScreen() if the user is signed in, and otherwise,
    show the AuthStackScreen(). 
    
    If, at any point, the user signs out, we want to immediately switch to the 
    AuthStack, without having to explicitly call "navigation.navigate()" -- similarly, 
    when a user signs in, we don't want to set up a complicated modal structure 
    that allows us to navigate to the RootStack.

    Thus, what we do instead is set up our App.tsx (entry point) 
    so that it points to this EntryStackScreen component. The purpose of this 
    screen is as follows:

    1. Observe the current authentication state using the .onAuthStateChanged
        listener. This is a listener built in to Firebase's Authentication library
        that fires whenever a user signs in or signs out.
        
        https://firebase.google.com/docs/reference/js/firebase.auth.Auth

    2. If the current authentication state hasn't loaded yet (e.g. on launch), then
        just return an empty view.

    3. If the current authentication state is NOT SIGNED IN, then return the
        AuthStackScreen.

    4. If the current authentication state is SIGNED IN, then return the 
        RootStackScreen.

    Because it wraps our entire application, this component will always be active, 
    and thus, we'll be listening to authentication state for the duration that we have
    our app open. When we quit our app, this component will dismount, and the listener
    will be killed. When we open it up again, this component will be the first component
    to mount (as defined by App.tsx, the entry point of our app).

    This application structure is based off of the React Navigation documentation:

    https://reactnavigation.org/docs/auth-flow/
*/
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
