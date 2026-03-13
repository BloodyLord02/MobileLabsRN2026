import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NEWS_DATA } from '../data';

export default function MainScreen({ navigation }) {
    const [data, setData] = useState(NEWS_DATA.slice(0, 10));
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setData(NEWS_DATA.slice(0, 10));
            setRefreshing(false);
        }, 1500);
    };

    const loadMore = () => {
        if (loadingMore || data.length >= NEWS_DATA.length) return;
        setLoadingMore(true);
        setTimeout(() => {
            const moreData = NEWS_DATA.slice(data.length, data.length + 5);
            setData([...data, ...moreData]);
            setLoadingMore(false);
        }, 1000);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailsScreen', {
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image
            })}
        >
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListHeaderComponent={<Text style={styles.headerText}>Останні новини</Text>}
            ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={7}
            maxToRenderPerBatch={5}
            windowSize={10}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10
    },
    textContainer: {
        justifyContent: 'center',
        marginLeft: 15,
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    description: {
        fontSize: 14,
        color: '#666'
    },
    headerText: { fontSize: 24, fontWeight: 'bold', padding: 15, textAlign: 'center' },
    separator: { height: 1, backgroundColor: '#ccc', marginHorizontal: 10 }
});