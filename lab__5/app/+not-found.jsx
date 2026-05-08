import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function NotFoundScreen() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Екран не знайдено</Text>

            <Button
                title="На головну"
                onPress={() => router.replace('/')}
            />
        </View>
    );
}