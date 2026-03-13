import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { CONTACTS_DATA } from '../data';

export default function ContactsScreen() {
    return (
        <SectionList
            sections={CONTACTS_DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.title}>{item}</Text>
                </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
}

const styles = StyleSheet.create({
    item:
        {
            padding: 15,
            backgroundColor: '#f9c2ff'
        },
    title:
        {
            fontSize: 18
        },
    header:
        {
            fontSize: 22,
            backgroundColor: '#fff',
            padding: 10,
            fontWeight: 'bold'
        },
    separator:
        {
            height: 1,
            backgroundColor: '#fff'
        }
});