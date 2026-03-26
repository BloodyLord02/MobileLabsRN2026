import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { GameProvider } from './context/GameContext';
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <GameProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Гра" component={HomeScreen} />
                    <Stack.Screen name="Завдання" component={TasksScreen} />
                    <Stack.Screen name="Налаштування" component={SettingsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </GameProvider>
    );
}