import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './screens/MainScreen';
import ContactsScreen from './screens/ContactsScreen';
import CustomDrawer from './components/CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DetailsScreen({ route }) {
    const { title, description, image } = route.params;
    return (
        <View style={styles.detailsContainer}>
            <Image source={route.params.image} style={styles.detailsImage} />
            <Text style={styles.detailsTitle}>{title}</Text>
            <Text style={styles.detailsDesc}>{description}</Text>
        </View>
    );
}

function NewsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
                <Drawer.Screen name="Новини" component={NewsStack} />
                <Drawer.Screen name="Контакти" component={ContactsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    detailsImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 20
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    detailsDesc: {
        fontSize: 16,
        textAlign: 'justify',
        width: '100%',
        lineHeight: 24
    }
});