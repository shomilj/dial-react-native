import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { EntryStackScreen } from "./screens/EntryStackScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <EntryStackScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
