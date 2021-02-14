import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { EntryStackScreen } from "./screens/EntryStackScreen";

export default function App() {
  return (
    <NavigationContainer>
      <EntryStackScreen />
    </NavigationContainer>
  );
}
