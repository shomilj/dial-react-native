import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FeedScreen } from "./FeedScreen";

const MainStack = createStackNavigator();

export function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}
