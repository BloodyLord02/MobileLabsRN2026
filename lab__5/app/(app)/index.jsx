import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';

import { Link } from 'expo-router';

import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

export default function Home() {

    const { logout } = useAuth();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
                padding: 15,
            }}
        >

            <TouchableOpacity
                onPress={logout}
                style={{
                    backgroundColor: '#ff3b30',
                    padding: 14,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                >
                    Вийти
                </Text>
            </TouchableOpacity>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (

                    <Link href={`/details/${item.id}`} asChild>

                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 20,
                                marginBottom: 20,
                                overflow: 'hidden',

                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.1,
                                shadowRadius: 6,

                                elevation: 5,
                            }}
                        >

                            <Image
                                source={item.image}
                                style={{
                                    width: '100%',
                                    height: 220,
                                }}
                            />

                            <View
                                style={{
                                    padding: 15,
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                        marginBottom: 8,
                                    }}
                                >
                                    {item.name}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: '#007AFF',
                                        fontWeight: '600',
                                    }}
                                >
                                    {item.price}
                                </Text>

                            </View>

                        </TouchableOpacity>

                    </Link>
                )}
            />

        </View>
    );
}