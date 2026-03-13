import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/avatar.png')}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Айсін Владислав Сергійович</Text>
                <Text style={styles.group}>Група: ІПЗ-23-1</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}
const styles = StyleSheet.create({
    profileContainer:
        {
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            marginBottom: 10,
            alignItems: 'center'
        },
    avatar:
        {
            width: 80,
            height: 80,
            borderRadius: 40,
            marginBottom: 10
        },
    name:
        {
            fontSize: 18,
            fontWeight: 'bold'
        },
    group:
        {
            fontSize: 14,
            color: '#666'
        }
});