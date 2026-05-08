import {
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { products } from '../../../data/products';

export default function Details() {

    const { id } = useLocalSearchParams();

    const product = products.find(
        (item) => item.id === id
    );

    if (!product) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Товар не знайдено</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
            }}
        >

            <Image
                source={product.image}
                resizeMode="contain"
                style={{
                    width: '100%',
                    height: 320,
                    backgroundColor: '#f5f5f5',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                }}
            />

            <View
                style={{
                    backgroundColor: 'white',
                    marginTop: -10,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    padding: 25,
                }}
            >

                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginBottom: 10,
                    }}
                >
                    {product.name}
                </Text>

                <Text
                    style={{
                        fontSize: 24,
                        color: '#007AFF',
                        fontWeight: '600',
                        marginBottom: 20,
                    }}
                >
                    {product.price}
                </Text>

                <Text
                    style={{
                        fontSize: 17,
                        lineHeight: 28,
                        color: '#555',
                    }}
                >
                    {product.description}
                </Text>

            </View>

        </ScrollView>
    );
}